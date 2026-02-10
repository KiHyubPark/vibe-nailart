import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@/lib/supabase/server';
import { THUMBNAIL_SYSTEM_PROMPT } from '@/lib/prompts/thumbnail';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: NextRequest) {
  try {
    // 1. 인증 확인
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
    }

    // 2. 요청 파싱
    const { prompt, imageBase64, imageMimeType } = await request.json() as {
      prompt: string;
      imageBase64?: string;
      imageMimeType?: string;
    };

    if (!prompt?.trim()) {
      return NextResponse.json({ error: '프롬프트를 입력해주세요.' }, { status: 400 });
    }

    // 3. Gemini API 호출
    const fullPrompt = `${THUMBNAIL_SYSTEM_PROMPT}\n\nUser request: ${prompt}`;

    const contents: Array<{ role: string; parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> }> = [];

    if (imageBase64 && imageMimeType) {
      // 이미지 편집 모드
      contents.push({
        role: 'user',
        parts: [
          { text: fullPrompt },
          {
            inlineData: {
              mimeType: imageMimeType,
              data: imageBase64,
            },
          },
        ],
      });
    } else {
      // 텍스트 → 이미지 생성 모드
      contents.push({
        role: 'user',
        parts: [
          { text: fullPrompt },
        ],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
        imageConfig: {
          aspectRatio: '16:9',
        },
      },
    });

    // 4. 응답에서 이미지 추출
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      return NextResponse.json({ error: '이미지 생성에 실패했습니다.' }, { status: 500 });
    }

    const imagePart = parts.find(
      (part: { inlineData?: { mimeType?: string } }) => part.inlineData?.mimeType?.startsWith('image/')
    );
    const textPart = parts.find(
      (part: { text?: string }) => part.text
    );

    if (!imagePart?.inlineData?.data) {
      return NextResponse.json({ error: '이미지가 생성되지 않았습니다. 다른 프롬프트를 시도해보세요.' }, { status: 500 });
    }

    // 5. Supabase Storage에 업로드
    const imageBuffer = Buffer.from(imagePart.inlineData.data, 'base64');
    const ext = imagePart.inlineData.mimeType === 'image/png' ? 'png' : 'jpg';
    const fileName = `${user.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('image')
      .upload(fileName, imageBuffer, {
        contentType: imagePart.inlineData.mimeType,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: '이미지 저장에 실패했습니다.' }, { status: 500 });
    }

    // 6. Public URL 생성
    const { data: urlData } = supabase.storage
      .from('image')
      .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;

    // 7. thumbnails 테이블에 레코드 저장
    const { data: thumbnail, error: dbError } = await supabase
      .from('thumbnails')
      .insert({
        user_id: user.id,
        image_path: fileName,
        prompt: prompt.trim(),
        status: 'completed',
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('thumbnails insert error:', dbError);
    }

    return NextResponse.json({
      imageUrl,
      text: textPart?.text || null,
      thumbnailId: thumbnail?.id || null,
    });
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: '이미지 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}

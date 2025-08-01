
import { test, expect } from '@playwright/test';

test.describe('새 메모 작성', () => {
  test('성공적인 메모 작성', async ({ page }) => {
    await page.goto('/');

    // 1. "새 메모" 버튼을 클릭합니다.
    await page.getByRole('button', { name: '새 메모' }).click();

    // 2. 화면에 메모 작성 폼이 나타나는지 확인합니다.
    const titleInput = page.getByPlaceholder('메모 제목을 입력하세요');
    const contentTextArea = page.locator('.w-md-editor-text-input');
    await expect(titleInput).toBeVisible();
    await expect(contentTextArea).toBeVisible();

    // 3. "제목" 입력란에 "새 테스트 메모"를 입력합니다.
    await titleInput.fill('새 테스트 메모');

    // 4. "카테고리" 드롭다운에서 "업무"를 선택합니다.
    await page.locator('#category').selectOption({ label: '업무' });

    // 5. "내용" 입력란에 "이것은 E2E 테스트를 위한 새 메모입니다."를 입력합니다.
    await contentTextArea.fill('이것은 E2E 테스트를 위한 새 메모입니다.');

    // 6. "태그" 입력란에 "테스트"를 입력하고 "추가" 버튼을 클릭합니다.
    await page.getByPlaceholder('태그를 입력하고 Enter를 누르세요').fill('테스트');
    await page.getByRole('button', { name: '추가' }).click();
    
    // 7. "저장하기" 버튼을 클릭합니다.
    await page.getByRole('button', { name: '저장하기' }).click();

    // 8. 메모 목록 상단에 "새 테스트 메모"가 추가되었는지 확인합니다.
    const newMemo = page.locator('div').filter({ hasText: /^새 테스트 메모업무/ }).first();
    await expect(newMemo).toBeVisible();

    // 9. 새로 추가된 메모의 카테고리가 "업무", 내용과 태그가 올바르게 표시되는지 확인합니다.
    await expect(newMemo.getByText('업무')).toBeVisible();
    
    // 상세 내용이 처음에는 보이지 않는 것을 확인
    const memoContent = page.getByText('이것은 E2E 테스트를 위한 새 메모입니다.');
    await expect(memoContent).toBeHidden();

    // 메모를 클릭하여 상세 뷰로 전환
    await newMemo.click();
    
    // 상세 내용과 태그가 보이는지 확인
    await expect(memoContent).toBeVisible();
    await expect(page.getByText('#테스트')).toBeVisible();
  });
});

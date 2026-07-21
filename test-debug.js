const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Collect console messages
  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => consoleLogs.push(`[PAGE ERROR] ${err.message}`));

  console.log('--- Navigating to /admin/resources ---');
  await page.goto('http://localhost:3000/admin/resources', { waitUntil: 'networkidle' });
  console.log('Page loaded.');

  // Check for console errors
  const errors = consoleLogs.filter(l => l.startsWith('[error]') || l.startsWith('[PAGE ERROR]'));
  if (errors.length > 0) {
    console.log('Console errors found:');
    errors.forEach(e => console.log('  ' + e));
  } else {
    console.log('No console errors.');
  }

  // 1. Check if "Add Resource" button exists
  console.log('\n=== TEST 1: Add Resource button ===');
  const addBtn = page.locator('button:has-text("Add Resource")');
  const addBtnCount = await addBtn.count();
  console.log(`Add Resource button count: ${addBtnCount}`);
  if (addBtnCount > 0) {
    const isVisible = await addBtn.first().isVisible();
    console.log(`Add Resource button visible: ${isVisible}`);
  }

  // 2. Check if ProductEditor is in the DOM (should NOT be visible initially)
  console.log('\n=== TEST 2: ProductEditor initial state ===');
  const editorOverlay = page.locator('[data-testid="product-editor-overlay"], .fixed.inset-0.z-50');
  const editorCount = await editorOverlay.count();
  console.log(`Fixed overlay elements (potential ProductEditor): ${editorCount}`);

  // Check for form elements that would be in the ProductEditor
  const editorTitle = page.locator('text="New Resource"');
  const editorTitleCount = await editorTitle.count();
  console.log(`"New Resource" heading count: ${editorTitleCount}`);

  // 3. Click "Add Resource"
  console.log('\n=== TEST 3: Clicking Add Resource ===');
  if (addBtnCount > 0) {
    await addBtn.first().click();
    console.log('Clicked Add Resource.');
    await page.waitForTimeout(1000);

    // Check console logs after click
    const newErrors = consoleLogs.filter(l => l.startsWith('[error]') || l.startsWith('[PAGE ERROR]'));
    if (newErrors.length > errors.length) {
      console.log('NEW console errors after click:');
      newErrors.slice(errors.length).forEach(e => console.log('  ' + e));
    }

    // Check if editor appeared
    const editorTitleAfter = page.locator('text="New Resource"');
    const editorTitleCountAfter = await editorTitleAfter.count();
    console.log(`"New Resource" heading count after click: ${editorTitleCountAfter}`);

    // Check for any modal/overlay
    const fixedOverlays = page.locator('.fixed');
    const overlayCount = await fixedOverlays.count();
    console.log(`Total .fixed elements: ${overlayCount}`);
    for (let i = 0; i < overlayCount; i++) {
      const el = fixedOverlays.nth(i);
      const isVisible = await el.isVisible();
      const classes = await el.getAttribute('class');
      console.log(`  .fixed[${i}]: visible=${isVisible}, class="${classes?.substring(0, 100)}"`);
    }

    // Check for form inputs
    const inputs = page.locator('input, select, textarea');
    const inputCount = await inputs.count();
    console.log(`Form inputs count: ${inputCount}`);

    // Take screenshot
    await page.screenshot({ path: 'E:\\worksheet-marketplace\\marque\\test-screenshot-add.png', fullPage: true });
    console.log('Screenshot saved: test-screenshot-add.png');
  }

  // 4. Reset and check three-dot menu
  console.log('\n=== TEST 4: Three-dot menu ===');
  // Navigate fresh
  await page.goto('http://localhost:3000/admin/resources', { waitUntil: 'networkidle' });

  // Find three-dot buttons
  const threeDotBtns = page.locator('button:has(svg circle)');
  const threeDotCount = await threeDotBtns.count();
  console.log(`Three-dot buttons found: ${threeDotCount}`);

  if (threeDotCount > 0) {
    const firstDot = threeDotBtns.first();
    const isVisible = await firstDot.isVisible();
    console.log(`First three-dot button visible: ${isVisible}`);

    // Check parent structure
    const parentHtml = await firstDot.evaluate(el => {
      let p = el.parentElement;
      let html = '';
      for (let i = 0; i < 5 && p; i++) {
        html = `div[${p.tagName}] class="${p.className?.substring(0, 80)}" > ` + html;
        p = p.parentElement;
      }
      return html;
    });
    console.log(`Parent chain: ${parentHtml}`);

    // Click three-dot button
    await firstDot.click();
    console.log('Clicked three-dot button.');
    await page.waitForTimeout(500);

    // Check for dropdown items
    const dropdownItems = page.locator('[role="menuitem"], [data-radix-collection-item]');
    const dropdownItemCount = await dropdownItems.count();
    console.log(`Dropdown items (role=menuitem): ${dropdownItemCount}`);

    // Check for any visible menu/popover/dropdown
    const menus = page.locator('[role="menu"], [data-radix-dropdown-menu-content], .fixed.inset-0.z-50');
    const menuCount = await menus.count();
    console.log(`Menu elements: ${menuCount}`);
    for (let i = 0; i < menuCount; i++) {
      const el = menus.nth(i);
      const isVisible = await el.isVisible();
      console.log(`  menu[${i}]: visible=${isVisible}`);
    }

    // Check ALL visible elements after click
    const allVisible = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const visible = [];
      for (const el of elements) {
        const style = window.getComputedStyle(el);
        if (style.position === 'fixed' && style.display !== 'none' && el.offsetHeight > 0) {
          visible.push({
            tag: el.tagName,
            class: el.className?.substring(0, 100),
            id: el.id,
            rect: el.getBoundingClientRect(),
          });
        }
      }
      return visible;
    });
    console.log(`Visible fixed elements: ${allVisible.length}`);
    allVisible.forEach(el => console.log(`  ${el.tag}#${el.id} class="${el.class}" rect=${JSON.stringify({top: el.rect.top, left: el.rect.left, w: el.rect.width, h: el.rect.height})}`));

    // Check for text content of dropdown items
    const allTexts = await page.evaluate(() => {
      const items = document.querySelectorAll('button, [role="menuitem"], [data-radix-collection-item]');
      return Array.from(items).filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && el.offsetHeight > 0;
      }).map(el => el.textContent?.trim().substring(0, 50));
    });
    console.log('All visible button texts:', allTexts.slice(0, 20));

    // Take screenshot
    await page.screenshot({ path: 'E:\\worksheet-marketplace\\marque\\test-screenshot-menu.png', fullPage: true });
    console.log('Screenshot saved: test-screenshot-menu.png');
  }

  // 5. Dump all console logs
  console.log('\n=== ALL CONSOLE LOGS ===');
  consoleLogs.forEach(l => console.log('  ' + l));

  await browser.close();
})().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

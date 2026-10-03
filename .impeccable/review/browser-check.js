async page => {
  await page.goto('http://127.0.0.1:4340/');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(images => Promise.all(images.map(img => { img.loading = 'eager'; return img.decode(); })));
  const widths = [320, 390, 700, 768, 1280, 1440, 1600];
  const layouts = [];
  for (const width of widths) {
    await page.setViewportSize({width, height: 960});
    await page.waitForLoadState('networkidle');
    await page.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0));
    layouts.push(await page.evaluate(() => ({width:innerWidth, documentWidth:document.documentElement.scrollWidth, heading:document.querySelector('h1').getBoundingClientRect().width, brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.alt)})));
  }
  await page.setViewportSize({width:1440,height:960});
  await page.waitForLoadState('networkidle');
    await page.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0));
  await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:'.impeccable/review/desktop.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.waitForLoadState('networkidle');
    await page.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0));
  await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
  await page.screenshot({path:'.impeccable/review/mobile.png',fullPage:true});
  await page.locator('#name').fill('Preview visitor');
  await page.locator('[data-service="property"]').click();
  const selection = await page.locator('#service').inputValue();
  const retainedName = await page.locator('#name').inputValue();
  await page.locator('#name').press('Enter');
  const form = await page.locator('form').evaluate(form => ({action:form.getAttribute('action'),submitDisabled:form.querySelector('button').disabled,fields:[...form.querySelectorAll('input,select')].map(e=>e.name),url:location.href}));
  const deadLinks = await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href')));
  await page.locator('#name').fill('');
  await page.locator('#service').selectOption('');
  return {layouts,selection,retainedName,form,deadLinks};
}

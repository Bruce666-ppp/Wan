import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const dir=fileURLToPath(new URL('../dist/',import.meta.url));
const files=(await readdir(dir)).filter(f=>f.endsWith('.html'));
const docs=new Map(await Promise.all(files.map(async f=>[f,await readFile(path.join(dir,f),'utf8')])));
const titles=new Set();let links=0;
for(const [file,html] of docs){
 assert.match(html,/<html lang="en">/,file);assert.match(html,/name="viewport"/,file);assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: one h1`);
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title && !titles.has(title),`${file}: unique title`);titles.add(title);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,`${file}: duplicate IDs`);
 for(const [,href] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https:|mailto:|data:)/.test(href)) continue;
  const [target,fragment]=href.split('#');const name=target||file;
  await access(path.join(dir,name));if(fragment) assert.ok(docs.get(name)?.includes(`id="${fragment}"`),`${file}: broken anchor ${href}`);links++;
 }
 assert.ok(!/href="(?:#|)"/.test(html),`${file}: empty link`);
}
console.log(`PASS: ${files.length} pages; ${links} local links/assets; unique titles, main headings, anchors and language metadata.`);

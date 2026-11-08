import { execFileSync } from 'node:child_process';
import { copyFileSync, cpSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

const output=resolve(process.argv[2]??'night-shift-crazygames.zip');
const gameTitle='Night Shift: Kiosk 07';
const temp=realpathSync(tmpdir());
const stage=mkdtempSync(join(temp,'night-shift-cg-'));
try{
  const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
  const head='</head>';
  if(!html.includes(head)) throw new Error('Missing game document head');
  const release=html
    .replace('<html lang="en">','<html lang="en" data-game-title="'+gameTitle+'">')
    .replace('<title>Gece Vardiyası 3B</title>','<title>'+gameTitle+'</title>')
    .replace('id="coverTag">00:00 / BÜFE 07','id="coverTag">'+gameTitle)
    .replace(head,'<link rel="stylesheet" href="./layout.css">\n<script src="./adapter.js"></script>\n'+head);
  writeFileSync(join(stage,'index.html'),release);
  cpSync(new URL('../dist/assets',import.meta.url),join(stage,'assets'),{recursive:true});
  copyFileSync(new URL('./adapter.js',import.meta.url),join(stage,'adapter.js'));
  copyFileSync(new URL('./layout.css',import.meta.url),join(stage,'layout.css'));
  mkdirSync(dirname(output),{recursive:true});
  execFileSync('tar',['-a','-cf',output,'-C',stage,'index.html','adapter.js','layout.css','assets'],{stdio:'inherit'});
  console.log(output);
}finally{
  const target=realpathSync(stage);
  if(target===stage&&dirname(target)===temp) rmSync(target,{recursive:true,force:true});
}

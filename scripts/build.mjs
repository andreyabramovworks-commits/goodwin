import {build} from 'esbuild';
await build({entryPoints:['src/enhancements.jsx'],bundle:true,minify:true,format:'esm',target:['es2022'],outfile:'assets/enhancements.js',legalComments:'linked',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},metafile:true}).then(async result=>{
  const {writeFile}=await import('node:fs/promises');
  await writeFile('build-meta.json',JSON.stringify(result.metafile,null,2));
  console.log('Built local React Bits enhancements. No CDN imports.');
});

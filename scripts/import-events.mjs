import {readFile,writeFile} from 'node:fs/promises';
if(!process.argv[2])throw Error('Usage: node scripts/import-events.mjs events.jsonl [input.json]');
const events=(await readFile(process.argv[2],'utf8')).split('\n').filter(s=>s.trim()).map((s,i)=>{let event;try{event=JSON.parse(s);}catch{throw Error('Invalid event on line '+(i+1));}if(typeof event.malicious!=='boolean')throw Error('Every event needs an independently supplied malicious boolean label.');return event;});
await writeFile(process.argv[3]||'imported-events.json',JSON.stringify({windowSeconds:60,baselineThreshold:3,candidateThreshold:5,events},null,2));console.log('Imported '+events.length+' labeled events; labels were not inferred by the detector.');

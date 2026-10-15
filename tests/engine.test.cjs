'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),E=require('../web/engine.js');
const copy=()=>structuredClone(E.initial);

test('Candidate threshold changes the false-positive tradeoff',()=>{const r=E.run(copy());assert.equal(r.report.baseline.fp,1);assert.equal(r.report.candidate.fp,0);assert.equal(r.report.candidate.fn,4);assert.equal(r.report.candidate.tp,4);});
test('No positive predictions yield null precision',()=>{const x=copy();x.candidateThreshold=99;assert.equal(E.run(x).metrics.precision,null);});
test('Empty event sets produce undefined-rate metrics, not perfect scores',()=>{const x=copy();x.events=[];const r=E.run(x);assert.equal(r.metrics.precision,null);assert.equal(r.metrics.recall,null);});
test('Labels must be independent boolean values',()=>{const x=copy();x.events[0].malicious='true';assert.throws(()=>E.run(x),/boolean/);});
test('Actor failures are not aggregated across users',()=>{const x=copy();x.events=x.events.map((e,i)=>({...e,actor:'actor-'+i}));assert.equal(E.run(x).report.candidate.tp,0);});
test('Invalid thresholds and duplicate event IDs fail',()=>{const x=copy();x.candidateThreshold=2.5;assert.throws(()=>E.run(x),/integers/);const y=copy();y.events.push({...y.events[0]});assert.throws(()=>E.run(y),/unique/);});

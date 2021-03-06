#!/usr/bin/env node

require('console.table');
const { exec, execSync } = require('child_process');

function is_updatable_to(dep) {
  var local_v = dep.local.split('.').map(x => parseInt(x));
  var wanted_v = dep.wanted.split('.').map(x => parseInt(x));
  var latest_v = dep.latest.split('.').map(x => parseInt(x));
  // omitting some comparisons because assuming some facts
  // comparing major versions (latest)
  if (latest_v[0] === local_v[0]) {
    // if different, then latest will be newer than local
    if (dep.latest !== dep.local) {
      return dep.latest;
    }
  }
  // comparing major versions (wanted)
  else if (wanted_v[0] === local_v[0]) {
    // if different, then wanted will be newer than local
    if (dep.wanted !== dep.local) {
      return dep.wanted;
    }
  }
  return false;
}

function update_dependencies(deps) {
  console.log(`Amount of dependencies to update their minor version: ${deps.length}\n`);
  console.table(deps);
  console.log(`Command to run:\n`);
  var command = `yarn upgrade`;
  var deps_list = '';
  for (var i = 0; i < deps.length; i++) {
    var name = deps[i].name;
    var target = deps[i].target;
    deps_list += ` "${name}@^${target}"`;
  }
  if (deps_list !== '') {
    command += deps_list;
    console.log(`${command}\n`);
    execSync(command, {stdio: 'inherit'});
  }
  else {
    console.log('There is nothing to update right now.');
  }
}

console.log(`Gathering information. Please, wait few seconds...\n`);

var command = 'yarn outdated --json';
exec(command, (err, stdout, stderr) => {
  var json = stdout.split('\n')[1]; // second line (index: 1) contains the actual data
  var data = JSON.parse(json);
  var result = [];
  for (var i = 0, j = 1; i < data.data.body.length; i++) {
    var dep = data.data.body[i];
    dep = {
      name: dep[0],
      local: dep[1],
      wanted: dep[2],
      latest: dep[3],
    };
    var target_ver = is_updatable_to(dep);
    if (!target_ver) {
      continue
    }
    var elem = {
      index: j++,
      name: dep.name,
      local: dep.local,
      wanted: dep.wanted,
      latest: dep.latest,
      target: target_ver
    };
    result.push(elem);
  }
  update_dependencies(result);
});

const outdated = require("outdated");
require('console.table');
const { exec } = require('child_process');

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
    deps_list += ` ${name}@^${target}`;
  }
  if (deps_list !== '') {
    command += deps_list;
    console.log(`${command}\n`);
    exec(command, (error, stdout, stderr) => {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });    
  }
  else {
    console.log('There is nothing to update right now.');
  }
}

console.log(`Gathering information. Please, wait few seconds...\n`);

outdated({
  silent: true,
  all: false,
  ask: false,
  prune: false,
  update: false,
  jsonUpdate: false,
  verbose: 0,
  bower: false,
  jspm: false
}).then(function(context) {
  var result = [];
  for (var i = 0, j = 1; i < context.dependencies.npm.length; i++) {
    var dep = context.dependencies.npm[i];
    if (dep['current'] === undefined) {
      continue;
    }
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

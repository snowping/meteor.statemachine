Package.describe({
  name: "snowping:statemachine",
  summary: "Javascript State Machine packaged for meteor",
  version: "2.3.6",
  git: "https://github.com/snowping/meteor.statemachine.git"
});

Package.on_use(function(api) {
  api.versionsFrom("METEOR@0.9.0");
  api.add_files(['lib/javascript-state-machine/state-machine.js'], ['client', 'server']);
  api.export('StateMachine');
});

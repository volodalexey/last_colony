var listen = require('./listen'),
  store = require('./store'),
  actions = require('./actions'),
  Matter = require('matter-js'),
  Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

module.exports = {
  onCanvasMounted: function(canvas) {
    var engine = Engine.create(),
      world = engine.world,
      render = Render.create({
        canvas: canvas,
        options: {
          wireframeBackground: '#ffffff',
          width: window.innerWidth,
          height: window.innerHeight
        },
        engine: engine
      });

    World.add(world, [
      Bodies.rectangle(300, 180, 700, 20, { isStatic: true, angle: Math.PI * 0.06 }),
      Bodies.rectangle(300, 70, 40, 40, { friction: 0.001 })
    ]);

    Engine.run(engine);
    Render.run(render);
  }
};
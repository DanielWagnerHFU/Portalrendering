namespace PortalEngine {
  import f = FudgeCore;
  f.Debug.info("Main Program Template running!")
  window.addEventListener("load", <EventListener>startup);

  function startup(_event: Event): void {
    let engine: Game = new Game();
    engine.init();
    engine.startLoop();
  }
}
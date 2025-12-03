const Scheduler = require('./scheduler');

describe('Scheduler Tests - Timer Mocks', () => {
  let scheduler;

  beforeEach(() => {
    scheduler = new Scheduler();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should execute task after delay', () => {
    const callback = jest.fn();

    scheduler.scheduleTask(callback, 1000);

    // Task niet nog uitgevoerd
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward tijd
    jest.advanceTimersByTime(1000);

    // Nu wel uitgevoerd
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should execute recurring task', () => {
    const callback = jest.fn();

    scheduler.scheduleRecurring(callback, 500);

    // Na 500ms: 1x
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);

    // Na 1000ms: 2x
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(2);

    // Na 2000ms: 4x
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(4);
  });

  test('should debounce function calls', () => {
    const callback = jest.fn();
    const debouncedFunc = scheduler.debounce(callback, 300);

    // Roep meerdere keren aan
    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    // Nog niet aangeroepen
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward
    jest.advanceTimersByTime(300);

    // Slechts 1x aangeroepen
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should run all timers', () => {
    const callback = jest.fn();

    scheduler.scheduleTask(callback, 1000);
    scheduler.scheduleTask(callback, 2000);
    scheduler.scheduleTask(callback, 3000);

    // Run alle pending timers
    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(3);
  });
});
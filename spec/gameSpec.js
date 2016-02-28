describe('Game', function() {
  var game;
  var frame;

  beforeEach(function() {
    frame = jasmine.createSpyObj('frame',
      ['addRoll', 'isRollsComplete', 'calcTotal']);
    game = new Game(frame);
    });

  describe('initializing a new Game', function() {
    it('starts out empty', function() {
      expect(game.frames).toEqual([]);
      expect(game.currFrameNum).toEqual(0);
    });
  });

  describe('#addRoll', function() {
    it('adds a roll to the game and calls addroll on frame', function() {
      game.addRoll(0)
      expect(frame.addRoll).toHaveBeenCalled();
    });

    it('pushes to frames a frame that has rolls complete', function() {
      frame.isRollsComplete.and.returnValue(true);
      game.addRoll(0)
      game.addRoll(0)
      expect(game.frames).toEqual([frame]);
    });

    it('adds maximum frames to the game', function() {
      frame.isRollsComplete.and.returnValue(true);
      for (var i = 0; i<19; i++) { game.addRoll(0); }
      expect(function() {
        game.addRoll(0);
      }).toThrowError("Max frames");
    });
  });

  describe('totalScore property', function() {
    it('calculates the per frame total scores', function() {
      frame.isRollsComplete.and.returnValue(true);
      game.addRoll(1)
      game.addRoll(2)
      frame.calcTotal.and.returnValue(3);
      expect(game.totalScore).toContain(3);
      game.addRoll(4)
      game.addRoll(5)
      expect(game.totalScore).toContain(12);
    });

  //   it('can handle spare scoring correctly', function() {
  //     frame1.rolls.and.returnValue([9, 1]);
  //     frame1.isSpare.and.returnValue(true);
  //     game.addRoll(frame1)
  //     game.addRoll(frame1)
  //     expect(game.frameScores).toContain(19);
  //   });
  //
  //   it('can handle strike scoring correctly', function() {
  //     frame1.rolls.and.returnValue([10]);
  //     frame1.isStrike.and.returnValue(true);
  //     game.addRoll(frame1)
  //     game.addRoll(frame1)
  //     expect(game.frameScores).toContain(20);
  //   });
  //
  //   it('can handle three strikes scoring correctly', function() {
  //     frame1.rolls.and.returnValue([10]);
  //     frame1.isStrike.and.returnValue(true);
  //     game.addRoll(frame1)
  //     game.addRoll(frame1)
  //     game.addRoll(frame1)
  //     expect(game.frameScores).toContain(30);
  //     expect(game.frameScores).toContain(20);
  //   });
  });
});

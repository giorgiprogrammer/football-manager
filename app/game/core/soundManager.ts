export class SoundManager {
  private static instance: SoundManager;

  passSound!: Phaser.Sound.BaseSound;
  goalSelebration!: Phaser.Sound.BaseSound;
  timeStartSound!: Phaser.Sound.BaseSound;
  fansSound!: Phaser.Sound.BaseSound;
  firstHalfEndSound!: Phaser.Sound.BaseSound;
  freeKickSound!: Phaser.Sound.BaseSound;
  cornerSound!: Phaser.Sound.BaseSound;
  goalSound!: Phaser.Sound.BaseSound;
  goCornerSound!: Phaser.Sound.BaseSound;
  catchBallSound!: Phaser.Sound.BaseSound;
  isFaulSound!: Phaser.Sound.BaseSound;
  goalBorderSound!: Phaser.Sound.BaseSound;
  borderSound!: Phaser.Sound.BaseSound;

  shootSound!: Phaser.Sound.BaseSound;
  //   penaltySound!: Phaser.Sound.BaseSound;

  constructor(public scene: Phaser.Scene) {
    if (SoundManager.instance) {
      return SoundManager.instance;
    }
    this.init();
  }

  init() {
    SoundManager.instance = this;

    this.passSound = this.scene.sound.add("passSound", {
      volume: 1,
      loop: false,
    });
    this.shootSound = this.scene.sound.add("shootSound", {
      volume: 1,
      loop: false,
    });

    this.goalSelebration = this.scene.sound.add("goalSelebrationSound", {
      volume: 1,
      loop: false,
    });
    this.timeStartSound = this.scene.sound.add("matchStart", {
      volume: 1,
      loop: false,
    });
    this.fansSound = this.scene.sound.add("fansSound", {
      volume: 0.08,
      loop: true,
    });
    this.goalSelebration = this.scene.sound.add("goalSelebrationSound", {
      volume: 1,
      loop: false,
    });
    this.firstHalfEndSound = this.scene.sound.add("firstHalfEnd", {
      volume: 1,
      loop: false,
    });
    this.cornerSound = this.scene.sound.add("cornerSound", {
      volume: 1,
      loop: false,
    });
    this.goalSound = this.scene.sound.add("goalSound", {
      volume: 1,
      loop: false,
    });
    this.goCornerSound = this.scene.sound.add("goCornerSound", {
      volume: 1,
      loop: false,
    });
    this.shootSound = this.scene.sound.add("shootSound", {
      volume: 1,
      loop: false,
    });
    this.catchBallSound = this.scene.sound.add("catchBallSound", {
      volume: 1,
      loop: false,
    });
    this.isFaulSound = this.scene.sound.add("isFaulSound", {
      volume: 1,
      loop: false,
    });
    this.goalBorderSound = this.scene.sound.add("goalBorderSound", {
      volume: 1,
      loop: false,
    });
    this.borderSound = this.scene.sound.add("borderSound", {
      volume: 1,
      loop: false,
    });
  }

  playBorderSound() {
    this.borderSound?.play();
  }

  playPassSound() {
    this.passSound?.play();
  }

  playShootSound() {
    this.shootSound?.play();
  }

  playSurroundingSound() {
    this.fansSound?.play();
  }

  playMatchStartSound() {
    this.timeStartSound?.play();
  }

  playfirstHalfEndSound() {
    this.firstHalfEndSound?.play();
  }

  playCornerSound() {
    this.cornerSound?.play();
  }

  playFreeKickSound() {
    this.playCornerSound();
    this.freeKickSound?.play();
  }

  playGoalSound() {
    this.goalSound?.play();
    this.goalSelebration?.play();
  }

  playGoCornerSound() {
    this.goCornerSound?.play();
  }

  playCatchBallSound() {
    this.catchBallSound?.play();
  }

  playIsFaulSound() {
    this.playCornerSound();
    this.isFaulSound?.play();
  }

  playGoalBorderSound() {
    this.goalBorderSound?.play();
  }
}

export default class SpecificationsScene extends Phaser.Scene{
    constructor() {
        super(SpecificationsScene);
    }

    create() {
        const mainCamera = this.cameras.main;

        mainCamera.setSize(370, 224);
        mainCamera.setPosition(1524, 458);
        mainCamera.centerOn(370 / 2, 224 / 2); // Центрируем камеру по размеру

        this.textLVL = this.add.text(0, 20, 'LVL:',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                color: '#ACACAC',
                wordWrap: { width: 310 }
            }).setOrigin(0);
        this.textHP = this.add.text(0, 70, 'HP:',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                color: '#ACACAC',
                wordWrap: { width: 310 }
            }).setOrigin(0);
        this.textEXP = this.add.text(0, 120, 'EXP:',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                color: '#ACACAC',
                wordWrap: { width: 310 }
            }).setOrigin(0);
        this.textDamage = this.add.text(0, 170, 'Damage:',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                color: '#ACACAC',
                wordWrap: { width: 310 }
            }).setOrigin(0);
    }
    updateInformationPlayer(lvl, hp, exp, damage) {
        this.textLVL.setText(lvl);
        this.textHP.setText(hp);
        this.textEXP.setText(exp);
        this.textDamage.setText(damage);
    }
}
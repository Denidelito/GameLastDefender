export default class SpecificationsScene extends Phaser.Scene{
    constructor() {
        super(SpecificationsScene);
    }

    create() {
        const mainCamera = this.cameras.main;

        mainCamera.setSize(410, 190);
        mainCamera.setPosition(1458, 470);
        mainCamera.centerOn(410 / 2, 190 / 2); // Центрируем камеру по размеру


        this.textDamage = this.add.text(239, 26, '',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                color: '#ACACAC',
                wordWrap: { width: 310 }
            }).setOrigin(0);
        this.textProtection = this.add.text(239, 86, '',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                color: '#ACACAC',
                wordWrap: { width: 310 }
            }).setOrigin(0);
        this.textForce = this.add.text(40, 26, '',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                color: '#ACACAC',
                wordWrap: { width: 310 }
            }).setOrigin(0);
        this.textAgility = this.add.text(40, 84, '',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                color: '#ACACAC',
                wordWrap: { width: 310 }
            }).setOrigin(0);
        this.textLuck = this.add.text(40, 142, '',
            {
                fontFamily: 'alundratext',
                fontSize: '24px',
                color: '#ACACAC',
                wordWrap: { width: 310 }
            }).setOrigin(0);
    }
    updateInformationPlayer(force, agility, luck, damage, protection) {
        this.textDamage.setText(force);
        this.textAgility.setText(agility);
        this.textLuck.setText(luck);
        this.textForce.setText(damage);
        this.textProtection.setText(protection);
    }
}
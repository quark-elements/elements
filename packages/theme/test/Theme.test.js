/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { expect } from '@open-wc/testing';
import { Theme, ThemeMode } from '../index.js';

class TestTheme extends Theme {
    constructor(name = null, foreground = null, background = null) {
        super(name ?? 'default');

        this.addToken('test-surface-color', '#FAFAFA').dark('#1E1E1E');
        this.addToken('test-on-surface-color', '#000000').dark('#FFFFFF');
        this.addToken('test-foreground-color', foreground ?? 'white');
        this.addToken('test-background-color', background ?? 'cornflowerblue');
    }
}

describe('theme', () => {
    it('sets the theme name', async () => {
        const defaultThemeBrand = new TestTheme();
        const redThemeBrand = new TestTheme('red', 'white', 'red');

        expect(defaultThemeBrand.name).to.equal('default');
        expect(redThemeBrand.name).to.equal('red');
    });

    it('sets the tokens correctly', async () => {
        const brand = new TestTheme('red', 'white', 'red');

        expect(brand.tokens.length).to.equal(4);
        expect(brand.tokens[0].name).to.equal('test-surface-color');
        expect(brand.tokens[1].name).to.equal('test-on-surface-color');
        expect(brand.tokens[2].name).to.equal('test-foreground-color');
        expect(brand.tokens[3].name).to.equal('test-background-color');
    });

    it('does not add duplicate tokens', async () => {
        const brand = new TestTheme('red', 'white', 'red');

        expect(brand.tokens.length).to.equal(4);

        const result1 = brand.addToken('test-background-color', 'green');
        expect(brand.tokens.length).to.equal(4);
        expect(result1).to.equal(null);

        const result2 = brand.addToken('test-background2-color', 'green');
        expect(brand.tokens.length).to.equal(5);
        expect(result2).to.not.equal(null);
    });

    it('sets the mode correctly', async () => {
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        expect(redThemeBrand.mode).to.equal(ThemeMode.system);

        redThemeBrand.mode = ThemeMode.dark;
        expect(redThemeBrand.mode).to.equal(ThemeMode.dark);

        redThemeBrand.mode = ThemeMode.light;
        expect(redThemeBrand.mode).to.equal(ThemeMode.light);

        redThemeBrand.mode = 'wrong';
        expect(redThemeBrand.mode).to.equal(ThemeMode.light);
    });

    it('creates the system mode stylesheet correctly', async () => {
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        expect(redThemeBrand.mode).to.equal(ThemeMode.system);

        const ss = redThemeBrand.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('@media (prefers-color-scheme: dark)');
        expect(ss).to.contain('--test-surface-color: #FAFAFA');
        expect(ss).to.contain('--test-surface-color: #1E1E1E');
    });

    it('creates the light mode stylesheet correctly', async () => {
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        redThemeBrand.mode = ThemeMode.light;
        expect(redThemeBrand.mode).to.equal(ThemeMode.light);
        expect(window._themeManager.mode).to.equal(ThemeMode.light);

        const ss = redThemeBrand.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.not.contain('@media (prefers-color-scheme: dark)');
        expect(ss).to.contain('--test-surface-color: #FAFAFA');
        expect(ss).to.not.contain('--test-surface-color: #1E1E1E');
    });

    it('creates the dark mode stylesheet correctly', async () => {
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        redThemeBrand.mode = ThemeMode.dark;
        expect(redThemeBrand.mode).to.equal(ThemeMode.dark);
        expect(window._themeManager.mode).to.equal(ThemeMode.dark);

        const ss = redThemeBrand.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.not.contain('@media (prefers-color-scheme: dark)');
        expect(ss).to.not.contain('--test-surface-color: #FAFAFA');
        expect(ss).to.contain('--test-surface-color: #1E1E1E');
    });

    it('can be registered with the global theme manager', async () => {
        const redThemeBrand = new TestTheme('red', 'white', 'red');

        expect(window._themeManager.has('red')).to.equal(false);
        redThemeBrand.register();
        expect(window._themeManager.has('red')).to.equal(true);
    });

    it('can be unregistered with the global theme manager', async () => {
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        
        redThemeBrand.register();
        expect(window._themeManager.has('red')).to.equal(true);

        redThemeBrand.unregister();
        expect(window._themeManager.has('red')).to.equal(false);
    });

    it('can be set as default with the global theme manager', async () => {
        const redThemeBrand = new TestTheme('red', 'white', 'red');

        redThemeBrand.register();
        expect(window._themeManager.has('red')).to.equal(true);
        expect(window._themeManager.defaultThemeName).to.equal(null);

        redThemeBrand.makeDefault();
        expect(window._themeManager.defaultThemeName).to.equal('red');
    });

    it('can be set as active with the global theme manager', async () => {
        const redThemeBrand = new TestTheme('red', 'white', 'red');

        redThemeBrand.register();
        expect(window._themeManager.activeThemeName).to.equal(null);

        redThemeBrand.use();
        expect(window._themeManager.activeThemeName).to.equal(redThemeBrand.name);
    });
});
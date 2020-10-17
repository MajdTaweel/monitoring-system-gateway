import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  MagnetometerReadingsComponentsPage,
  MagnetometerReadingsDeleteDialog,
  MagnetometerReadingsUpdatePage,
} from './magnetometer-readings.page-object';

const expect = chai.expect;

describe('MagnetometerReadings e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let magnetometerReadingsComponentsPage: MagnetometerReadingsComponentsPage;
  let magnetometerReadingsUpdatePage: MagnetometerReadingsUpdatePage;
  let magnetometerReadingsDeleteDialog: MagnetometerReadingsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MagnetometerReadings', async () => {
    await navBarPage.goToEntity('magnetometer-readings');
    magnetometerReadingsComponentsPage = new MagnetometerReadingsComponentsPage();
    await browser.wait(ec.visibilityOf(magnetometerReadingsComponentsPage.title), 5000);
    expect(await magnetometerReadingsComponentsPage.getTitle()).to.eq('gatewayApp.sensingnodeMagnetometerReadings.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(magnetometerReadingsComponentsPage.entities), ec.visibilityOf(magnetometerReadingsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create MagnetometerReadings page', async () => {
    await magnetometerReadingsComponentsPage.clickOnCreateButton();
    magnetometerReadingsUpdatePage = new MagnetometerReadingsUpdatePage();
    expect(await magnetometerReadingsUpdatePage.getPageTitle()).to.eq('gatewayApp.sensingnodeMagnetometerReadings.home.createOrEditLabel');
    await magnetometerReadingsUpdatePage.cancel();
  });

  it('should create and save MagnetometerReadings', async () => {
    const nbButtonsBeforeCreate = await magnetometerReadingsComponentsPage.countDeleteButtons();

    await magnetometerReadingsComponentsPage.clickOnCreateButton();

    await promise.all([
      magnetometerReadingsUpdatePage.setXInput('5'),
      magnetometerReadingsUpdatePage.setYInput('5'),
      magnetometerReadingsUpdatePage.setZInput('5'),
      magnetometerReadingsUpdatePage.setRmsInput('5'),
      magnetometerReadingsUpdatePage.sensingNodeSelectLastOption(),
    ]);

    expect(await magnetometerReadingsUpdatePage.getXInput()).to.eq('5', 'Expected x value to be equals to 5');
    expect(await magnetometerReadingsUpdatePage.getYInput()).to.eq('5', 'Expected y value to be equals to 5');
    expect(await magnetometerReadingsUpdatePage.getZInput()).to.eq('5', 'Expected z value to be equals to 5');
    expect(await magnetometerReadingsUpdatePage.getRmsInput()).to.eq('5', 'Expected rms value to be equals to 5');

    await magnetometerReadingsUpdatePage.save();
    expect(await magnetometerReadingsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await magnetometerReadingsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last MagnetometerReadings', async () => {
    const nbButtonsBeforeDelete = await magnetometerReadingsComponentsPage.countDeleteButtons();
    await magnetometerReadingsComponentsPage.clickOnLastDeleteButton();

    magnetometerReadingsDeleteDialog = new MagnetometerReadingsDeleteDialog();
    expect(await magnetometerReadingsDeleteDialog.getDialogTitle()).to.eq('gatewayApp.sensingnodeMagnetometerReadings.delete.question');
    await magnetometerReadingsDeleteDialog.clickOnConfirmButton();

    expect(await magnetometerReadingsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

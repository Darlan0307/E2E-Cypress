class RegisterImage {
  elements = {
    title: () => cy.get("#title"),
    imageUrl: () => cy.get("#imageUrl"),
    btnSubmit: () => cy.get("#btnSubmit"),
    errorTitle: () => cy.get("#titleFeedback"),
    errorImageUrl: () => cy.get("#urlFeedback"),
  };

  typeTitle(text) {
    if (!text) return;
    this.elements.title().type(text);
  }
  typeImageUrl(text) {
    if (!text) return;
    this.elements.imageUrl().type(text);
  }
  clickBtnSubmit() {
    this.elements.btnSubmit().click();
  }
}

const registerImage = new RegisterImage();
const colors = {
  errors: "rgb(220, 53, 69)",
  success: "",
};

describe("Funcionalidade: Registro de Imagem", () => {
  describe("Enviando uma imagem com entradas inválidas", () => {
    after(() => {
      cy.clearAllLocalStorage();
    });

    const input = {
      title: "",
      imageUrl: "",
    };

    it("Dado que estou na página de registro de imagem", () => {
      cy.visit("/");
    });
    it('Quando eu insiro " " no campo de título', () => {
      registerImage.typeTitle(input.title);
    });
    it('Então eu insiro " " no campo de URL', () => {
      registerImage.typeImageUrl(input.imageUrl);
    });
    it("Então eu clico no botão de enviar", () => {
      registerImage.clickBtnSubmit();
    });
    it('Então eu devo ver a mensagem "Por favor, digite um título para a imagem" acima do campo de título', () => {
      registerImage.elements.errorTitle().should("exist");
    });
    it('E eu devo ver a mensagem "Por favor, digite uma URL válida" acima do campo imageUrl', () => {
      registerImage.elements.errorImageUrl().should("exist");
    });
    it("E eu devo ver um ícone de exclamação nos campos de título e URL", () => {
      registerImage.elements.title().should(([element]) => {
        const styles = getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, colors.errors);
      });
    });
  });
});

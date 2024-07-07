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
  hitEnter() {
    cy.focused().type("{enter}");
  }
}

const registerImage = new RegisterImage();
const colors = {
  errors: "rgb(220, 53, 69)",
  success: "rgb(25, 135, 84)",
};

describe("Funcionalidade: Registro de Imagem", () => {
  // Cenario 1
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
    it('Então eu devo ver a mensagem "Please type a title for the image." acima do campo de título', () => {
      registerImage.elements
        .errorTitle()
        .should("contains.text", "Please type a title for the image.");
    });
    it('E eu devo ver a mensagem "Please type a valid URL" acima do campo imageUrl', () => {
      registerImage.elements
        .errorImageUrl()
        .should("contains.text", "Please type a valid URL");
    });
    it("E eu devo ver um ícone de exclamação nos campos de título e URL", () => {
      registerImage.elements.title().should(([element]) => {
        const styles = getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, colors.errors);
      });
    });
  });
  // Cenario 2
  describe("Enviando uma imagem com entradas válidas usando a tecla enter", () => {
    after(() => {
      cy.clearAllLocalStorage();
    });

    const input = {
      title: "Alien BR",
      imageUrl:
        "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg",
    };

    it("Dado que estou na página de registro de imagem", () => {
      cy.visit("/");
    });
    it("Forçando o error", () => {
      registerImage.clickBtnSubmit();
    });
    it("Quando eu insiro 'Alien BR' no campo de título", () => {
      registerImage.typeTitle(input.title);
    });
    it("Então eu devo ver um ícone de verificação no campo de título", () => {
      registerImage.elements.title().should(([element]) => {
        const styles = getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, colors.success);
      });
    });
    it('Quando eu insiro "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" no campo de URL', () => {
      registerImage.typeImageUrl(input.imageUrl);
    });
    it("Então eu devo ver um ícone de verificação no campo imageUrl", () => {
      registerImage.elements.title().should(([element]) => {
        const styles = getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, colors.success);
      });
    });
    it("Então eu posso pressionar enter para enviar o formulário", () => {
      registerImage.hitEnter();
      cy.wait(100);
    });
    it("E a lista de imagens registradas deve ser atualizada com o novo item", () => {
      cy.get("#card-list .card-img").should((elements) => {
        const lastElement = elements[elements.length - 1];
        const src = lastElement.getAttribute("src");
        assert.strictEqual(src, input.imageUrl);
      });
    });
    it("E o novo item deve ser armazenado no localStorage", () => {
      const items = JSON.parse(localStorage.getItem("tdd-ew-db"))[0];

      expect(items).to.have.property("title", input.title);
      expect(items).to.have.property("imageUrl", input.imageUrl);
    });
    it("Então os campos de entrada devem ser limpos", () => {
      registerImage.elements.title().should("be.empty");
      registerImage.elements.imageUrl().should("be.empty");
    });
  });
});

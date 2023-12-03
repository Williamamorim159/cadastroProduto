class Produto {
  constructor() {
    this.id = 1;
    this.arrayProdutos = [];
    this.editId = null;
  }

  salvar() {
    let produto = this.lerDados();

    if (this.validaCampos(produto)) {
      if (this.editId == null) {
        this.adicionar(produto);
      } else {
        this.atualizar(this.editId, produto);
      }
    }

    this.listaTabela();
    this.cancelar();
  }

  listaTabela() {
    let tbody = document.querySelector("#tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arrayProdutos.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_produto = tr.insertCell();
      let td_valor = tr.insertCell();
      let td_acao = tr.insertCell();

      td_id.innerText = this.arrayProdutos[i].id;
      td_produto.innerText = this.arrayProdutos[i].nomeProduto;
      td_valor.innerText = `R$ ${this.arrayProdutos[i].preco}`;

      td_id.classList.add("center");
      td_acao.classList.add("center");

      let imgEdit = document.createElement("img");
      imgEdit.src = "./assets/editar.png";
      imgEdit.setAttribute(
        "onclick",
        `produto.preparaEditacao(${JSON.stringify(this.arrayProdutos[i])})`
      );

      let imgDelete = document.createElement("img");
      imgDelete.src = "./assets/lixeira.png";
      imgDelete.setAttribute(
        "onclick",
        `produto.deletar(${this.arrayProdutos[i].id})`
      );

      td_acao.appendChild(imgEdit);
      td_acao.appendChild(imgDelete);
    }
  }

  adicionar(produto) {
    this.arrayProdutos.push(produto);
    this.id++;
  }

  atualizar(id, produto) {
    for (let i = 0; i < this.arrayProdutos.length; i++) {
      if (this.arrayProdutos[i].id == id) {
        this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
        this.arrayProdutos[i].preco = produto.preco;
      }
    }
  }

  lerDados() {
    let produto = {};

    produto.id = this.id;
    produto.nomeProduto = document.querySelector("#produto").value;
    produto.preco = document.querySelector("#preco").value;

    return produto;
  }

  preparaEditacao(dados) {
    this.editId = dados.id;

    document.querySelector("#produto").value = dados.nomeProduto;
    document.querySelector("#preco").value = dados.preco;

    document.querySelector("#btn1").innerText = "Atualizar";
  }

  validaCampos(produto) {
    let msg = "";
    if (produto.nomeProduto == "") {
      msg += "- Informe o nome do produto \n";
    }

    if (produto.preco == "") {
      msg += "- Informe o preco do produto \n";
    }

    if (msg != "") {
      alert(msg);
      return false;
    }
    return true;
  }

  cancelar() {
    document.querySelector("#produto").value = "";
    document.querySelector("#preco").value = "";

    document.querySelector("#btn1").innerText = "Salvar";
    this.editId = null;
  }

  deletar(id) {
    if (confirm(`Deseja realmente excluir o produto de ID: ${id}`)) {
      let tbody = document.querySelector("#tbody");
      for (let i = 0; i < this.arrayProdutos.length; i++) {
        if (this.arrayProdutos[i].id == id) {
          this.arrayProdutos.splice(i, 1);
          tbody.deleteRow(i); // deleta linha
        }
      }
    }
  }
}

let produto = new Produto();

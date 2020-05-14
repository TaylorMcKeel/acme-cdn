const app = document.querySelector("#app");

const links = [
  axios.get("https://acme-users-api-rev.herokuapp.com/api/companies"),
  axios.get("https://acme-users-api-rev.herokuapp.com/api/products"),
];

Promise.all(links).then((res) => {
  if (window.location.hash.slice(1) === "") {
    window.location.hash = "#products";
  }
  renderTop(res[1].data, res[0].data);
  renderTable(res[1].data, res[0].data);
  window.addEventListener("hashchange", () => {
    app.innerHTML = "";
    const prods = document.querySelector(".prods");
    const comp = document.querySelector(".comps");
    renderTop(res[1].data, res[0].data);
    renderTable(res[1].data, res[0].data);
  });
});

const renderTop = (products, companies) => {
  const hash = window.location.hash.slice(1);
  const header = document.createElement("h1");
  header.innerText = "ACME CDNs";
  const navBar = document.createElement("div");
  navBar.classList.add("nav");
  const prodSpan = document.createElement("span");
  const compSpan = document.createElement("span");
  const prodLink = document.createElement("a");
  prodLink.innerText = `Products(${products.length})`;
  prodLink.href = "#products";
  if (hash === "products") {
    prodSpan.classList.add("selected");
  }

  const compLink = document.createElement("a");
  compLink.innerText = `Companies(${companies.length})`;
  compLink.href = "#companies";
  if (hash === "companies") {
    compSpan.classList.add("selected");
  }

  prodSpan.append(prodLink);
  compSpan.append(compLink);
  navBar.append(prodSpan, compSpan);
  app.append(header, navBar);
};

const renderTable = (products, companies) => {
  const hash = window.location.hash.slice(1);
  const tableDiv = document.createElement("div");
  if (hash === "products") {
    const headers = Object.keys(products[0])
      .map((item) => {
        return `<td>${item.toUpperCase()}</td>`;
      })
      .join("");

    const prods = products
      .map((prod) => {
        return `
          <tr>
            <td>${prod.id}</td>
            <td>${prod.name}</td>
            <td>${prod.description}</td>
            <td>${prod.suggestedPrice}</td>
            <td>${prod.createdAt}</td>
            <td>${prod.updatedAt}</td>
          </tr>`;
      })
      .join("");
    const html = `
      <table class='table table-dark table-striped'>
        <thead>
            <tr>
                ${headers}
            </tr>
        </thead>
        <tbody>
            ${prods}
        </tbody>
      </table>`;

    tableDiv.innerHTML = html;
  } else if (hash === "companies") {
    const headers = Object.keys(companies[0])
      .map((item) => {
        return `<td>${item.toUpperCase()}</td>`;
      })
      .join("");
    const comps = companies
      .map((comp) => {
        return `
            <tr>
              <td>${comp.id}</td>
              <td>${comp.name}</td>
              <td>${comp.phone}</td>
              <td>${comp.state}</td>
              <td>${comp.catchPhrase}</td>
              <td>${comp.createdAt}</td>
              <td>${comp.updatedAt}</td>
            </tr>`;
      })
      .join("");
    const html = `
        <table class='table table-dark table-striped'>
          <thead>
              <tr>
                  ${headers}
              </tr>
          </thead>
          <tbody>
              ${comps}
          </tbody>
        </table>`;

    tableDiv.innerHTML = html;
  }

  app.append(tableDiv);
};

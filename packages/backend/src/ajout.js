
const HOST = '0.0.0.0';
const PORT = 3000;
const IP = HOST;
const port = PORT;
const url = `http://${IP}:${port}/api/platsClient`;
async function fetchPlats() {
    const response = await fetch(url);
    const plats = await response.json();
    console.log("les plats",plats);
    
    
    const tableBody = document.getElementById("platsTable");
    tableBody.innerHTML = "";

    plats.forEach(plat => {
        console.log(plat);
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${plat.Nom_plat}</td>
            <td>${plat.Like} </td>
            <td>${plat.DisLike} </td>
            <td><button onclick="ajouterPlat(${plat.ID_plat})">Ajouter</button></td>
            <td><button onclick="supprimerPlat(${plat.ID_plat})">Supprimer</button></td>
        `;
        tableBody.appendChild(row);
    });
}

async function ajouterPlat(id) {
    const url1 = `http://${IP}:${port}/api/platsInsert`;
    console.log(url1);
    
    // /api/platsInsert
    try {
        const data = { 'ID_plat':id};
        const response = await fetch(url1, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        // console.log("message d'erreur: ",result);
        
        alert(result.message);
    }
    catch(error){
        console.log(error);
        
    }

}

async function supprimerPlat(id) {
    const url1 = `http://${IP}:${port}/api/platsDelete`;
    console.log(url1);
    
    // /api/platsInsert
    try {
        const data = { 'ID_plat':id};
        const response = await fetch(url1, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        // console.log("message d'erreur: ",result);
        
        alert(result.message);
    }
    catch(error){
        console.log(error);
        
    }
}

fetchPlats();
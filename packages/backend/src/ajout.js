
// import {addPlats, addPlats_Ingredients, getPlats_Ingredients_Client} from "../utils/acces_bdd.ts"
// import { HOST, PORT } from '../utils/other.js';
const HOST = '192.168.1.129';
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
        `;
        tableBody.appendChild(row);
    });
}

async function ajouterPlat(id) {
    const url1 = `http://${IP}:${port}/api/platsInsert`;
    // /api/platsInsert
    const response = await fetch(url1, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'ID_plat':id})
    });
    const result = await response.json();
    alert(result.message);

}

fetchPlats();
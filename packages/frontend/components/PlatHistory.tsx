  async function FormatDataPlatReconnu(data : string[]){
    const lines = [];
    for (const ligne of data) {
      const query = `${ligne}`;
      try {
        const res = await getPlats({Nom_plat: query},false,true,1);
        if(res != undefined && res.length > 0 && res != null){
          const id = res[0].ID_plat;
          const color = await change(id);
          lines.push({"text":ligne,color:color?.back,"id":id});
        }
        else{
          lines.push({"text":ligne,color:"black","id":null});
        }
      }
      catch (error) {
        console.error("Erreur lors de la récupération des plats:", error);
      }
    }
    return lines;
  }

  async function setRecoData(id : number){
    const objet = {'ID_menu':id};
      const data = await getRecherches_Historique(objet,false,false,1);
      if(data != undefined){
        const newdata = data.map((a)=> a.text);
        const lines = await FormatDataPlatReconnu(newdata);
        setMenus(lines);
        setIsloaded(true);
      }
      else{
        setMenus([]);
      }
  }
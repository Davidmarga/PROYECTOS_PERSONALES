import express from "express";
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/coasters', async (req, res) => {
    const allCoasters = [];
    let page = 1;
    let keepFetching = true;

    while (keepFetching){
  const response = await fetch(`https://captaincoaster.com/api/coasters?page=${page}`, {
    headers: {
      'accept': 'application/ld+json',
      'Authorization': 'Bearer a8285f7b-28f1-4895-9e38-d79fe805b0b5'
       }
    });

    console.log(`Petición página ${page}: status ${response.status}`);

    if (!response.ok) {
     console.error(`Error de API externa: ${response.status} - ${errorText}`);
      return res.status(response.status).json({ error: 'Error en la API externa' });
    }

  const data = await response.json();
  if (!data.member || data.member.length ===0){
    keepFetching=false;
  }else{
    allCoasters.push(...data.member);
      if (data.member.length < 30) {
        // Última página, menos de 30 resultados
        keepFetching = false;
  }else{
    page++;
  }
 }
}

res.json({member: allCoasters});
});

app.listen(PORT, () => console.log(`Proxy server running at http://localhost:${PORT}`));




app.get('/coasters/:id', async (req, res) => {
    const id = req.params.id;
    try{
       const response = await fetch(`https://captaincoaster.com/api/coasters/${id}`,{
       headers: {
      'accept': 'application/ld+json',
      'Authorization': 'Bearer a8285f7b-28f1-4895-9e38-d79fe805b0b5'
       }
    });

        if (!response.ok) {
     console.error(`Error de API externa: ${response.status} - ${errorText}`);
      return res.status(response.status).json({ error: 'Error en la API externa' });
    }
    const data = await response.json();
    res.json(data);
    } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



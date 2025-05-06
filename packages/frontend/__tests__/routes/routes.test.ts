import { PostPlatClient, GetPlatClient, PostResto, PostMenu, PostRecherche, PostUpdateRequest, PostUpdatePlatsRequest, GetPlat_a_Vote, Ping, } from '@/utils/routes';
import { FormData, resto, menu, recherche } from '@/utils/type';
import { IP, port } from '@/utils/constants';
// import hmac from "crypto-js/hmac-sha256";

// Mock de l'API fetch globale
global.fetch = jest.fn();

jest.mock("crypto-js/hmac-sha256",()=>{
  return jest.fn(() => ({
    toString: () => 'mocked-signature',
  }));
});
const mockId = "12345";
const mockResponse = { id: mockId, name: 'Plat Test' };
const genereHMACSignature = {signature:"",timestamp:22};
const GET = jest.fn().mockResolvedValueOnce(mockResponse);
describe('Fonctions API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test pour la fonction PostPlatClient
  it('doit appeler POST avec les bons arguments dans PostPlatClient', async () => {
    // hmac.toString = jest.fn().mockReturnValue("rien");
    // hmac.sigBytes = jest.fn();
    const mockData: FormData = { name:'plat',ingredients:[{name:'Tomate',weight:'150'}]};
    const mockResponse = { success: true };  
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await PostPlatClient(mockData);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('platsClient'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(mockData),
    }));
    expect(result).toEqual(mockResponse);
  });

  // Test pour la fonction GetPlatClient
  it('doit appeler GET avec la bonne URL et retourner les données de GetPlatClient', async () => {
    const mockId = "12345";
    const mockResponse = { id: mockId, name: 'Plat Test' };  // réponse attendue
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ id: "12345", name: 'Plat Test' }),
    });
    
    const result = await GetPlat_a_Vote(mockId);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(mockId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  // Test pour la fonction PostResto
  it('doit appeler POST avec les bons arguments dans PostResto', async () => {
    const mockData: resto = { NomResto: "Ru triolet",
        Latitude : 38,
        Longitude : 38,};
    const mockResponse = { success: true };  // réponse attendue
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await PostResto(mockData);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('restaurants'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(mockData),
    }));
    expect(result).toEqual(mockResponse);
  });

  // Test pour la fonction PostMenu
  it('doit appeler POST avec les bons arguments dans PostMenu', async () => {
    const mockData: menu = { NomMenu: "amerique", ID_restaurant: 1 };
    const mockResponse = { success: true };  
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await PostMenu(mockData);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('menus'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(mockData),
    }));
    expect(result).toEqual(mockResponse);
  });

  // Test pour la fonction PostRecherche
  it('doit appeler POST avec les bons arguments dans PostRecherche', async () => {
    const mockData: recherche = {Text_request: "riz pillat", ID_menu: 1, Date: "02-04-2025" };
    const mockResponse = { success: true };  
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    await PostRecherche(mockData);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('recherches'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(mockData),
    }));
  });

  // Test pour la fonction PostUpdateRequest
  it('doit appeler POST avec les bons arguments dans PostUpdateRequest', async () => {
    const mockData = { ID_plat: 123 };  // données de test ici
    const mockResponse = { success: true };  // réponse attendue
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await PostUpdateRequest(mockData);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('updates'), expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(mockData),
    }));
    expect(result).toEqual(mockResponse);
  });

  // Test pour la fonction GetPlat_a_Vote
  it('doit appeler GET avec la bonne URL et retourner les données de GetPlat_a_Vote', async () => {
    const mockId = "12345";
    const mockResponse = { id: mockId, name: 'Plat à Voter' };  // réponse attendue
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await GetPlat_a_Vote(mockId);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(mockId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  // Test pour la fonction Ping
  it('doit appeler GET sur l\'endpoint ping et retourner un code', async () => {
    const mockResponse = { code: 201 };  // réponse attendue
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await Ping();
    expect(fetch).toHaveBeenCalledWith(
      `https://${IP}/ping`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockResponse.code);
  });

  it('doit retourner null si la requête Ping échoue', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Erreur réseau'));
    // const Ping = jest.fn().mockResolvedValue(null);
    const result = await Ping();
    expect(result).toBeNull();
  });
});

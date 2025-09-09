// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import supertest from 'supertest'
import app from '../../src/app';
import 'jest-extended';

const request = supertest(app);
const testNom1 = "Rémi";
const testNom2 = "Tristan";

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  beforeAll(async () => {
    await request.post('api/v1/jeu/demarrerJeu').send({nom: testNom1})
    await request.post('api/v1/jeu/demarrerJeu').send({nom: testNom2})
  });


  it("scénario principal - succès : GET /api/v1/jeu/redemarrerJeu doit retourner 200 et du JSON", async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it("postcondition : après redemarrerJeu, jouer/{nom} doit être 404 not found", async () => {
    // redémarrer
    await request.get('/api/v1/jeu/redemarrerJeu').expect(200);

    // vérifier postcondition
    const response = await request.get('/api/v1/jeu/jouer/' + testNom1);
    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
    expect(response.body.error).toInclude("n'existe pas");
    expect(response.body.error).toInclude(testNom2);
  });

});


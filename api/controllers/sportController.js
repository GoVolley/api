const ErrorMessage = require('../constructors/errorMessage');
const SuccessMessage = require('../constructors/successMessage');

const tokenVerify = require('../middlewares/token');

const Sport = require('../../database/models/Sport');
const validator = require('../validator/sport');

async function store(request, response) {
  
  await tokenVerify(request, response);

  const {error} = validator.validate(request.body);
  if (error) return new ErrorMessage(error.details[0].message,error.details[0].context.key).send(response);

  const existSport = await Sport.findOne({ where: {name: request.body.name}});
  if (existSport) return new ErrorMessage('Le sport existe déjà !', 'name').send(response);

  const sport = await new Sport({
    name: request.body.name,
    primary_color: request.body.primary_color,
    secondary_color: request.body.secondary_color,
  });

  try {
      const savedSport = await sport.save();
      return new SuccessMessage('Le sport '+savedSport.name+' à bien été ajouté !').send(response);
  } catch(error) {
    if (existSport) return new ErrorMessage(error).send(response);
  }

}

async function showAll(request, response) {
  
  await tokenVerify(request, response);

  const sports = await Sport.findAll();
  return response.json(sports);
}

async function destroy(request, response) {

  await tokenVerify(request, response);
  
  if (request.body.id) {
    
    const sport = await Sport.findOne({ where: {sport_id: request.body.id}});
    if (!sport) return new ErrorMessage('Le sport n\'existe pas !').send(response);

    try {
      await sport.destroy();
      new SuccessMessage('Le sport '+sport.name+' à bien été supprimé !').send(response);
    } catch (error) {
      if (!sport) return new ErrorMessage(error).send(response);
    }

  } else if (request.body.name) {

    const sport = await Sport.findOne({ where: {name: request.body.name}});
    if (!sport) return new ErrorMessage('Le sport n\'existe pas !', 'name').send(response);

    try {
      await sport.destroy();
      new SuccessMessage('Le sport '+sport.name+' à bien été supprimé !').send(response);
    } catch (error) {
      if (!sport) return new ErrorMessage(error).send(response);
    }

  } else {
    return new ErrorMessage("Vous devez indiquer un id ou le nom d'un sport !").send(response);
  }

}

module.exports = {
  store,
  destroy,
  showAll,
};
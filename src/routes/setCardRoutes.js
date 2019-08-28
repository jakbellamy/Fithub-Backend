import { addNewSetCard, getSetCardWithID, updateSetCard, deleteSetCard, getSetCards } from "../controllers/setCardController";
import { auth } from "../middleware/auth";

const setCardRoutes = (app) => {
    app.route('/setCards')
    .get(auth, getSetCards)
    .post(auth, addNewSetCard);

    app.route('/setCard/:setCardId')
    .get(auth, getSetCardWithID)
    .put(auth, updateSetCard)
    .delete(auth, deleteSetCard);
}

export default setCardRoutes
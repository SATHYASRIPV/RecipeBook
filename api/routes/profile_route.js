import { VegProfile, NonvegProfile } from "../controllers/profile_controller.js"
import {authenticateUser} from "../authentication.js"

router.get("/vegprofile/:id",VegProfile, authenticateUser)
router.get("/vegprofile/:id", NonvegProfile, authenticateUser)

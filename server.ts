import app from "./app";
import { sequelize } from "./config/database";

const PORT = 3000;

(async () => {
  try {
    await sequelize.sync();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
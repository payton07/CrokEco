"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSmt = addSmt;
exports.getSmt = getSmt;
exports.updateSmt = updateSmt;
exports.deleteSmt = deleteSmt;
exports.getIngredients = getIngredients;
exports.getPlats_Ingredients_Client = getPlats_Ingredients_Client;
exports.getPlats_Client = getPlats_Client;
exports.getMenus_Client = getMenus_Client;
exports.getRecherches_Client = getRecherches_Client;
exports.getRestaurant_Client = getRestaurant_Client;
exports.getPlats = getPlats;
exports.getPlats_Ingredients = getPlats_Ingredients;
exports.getSous_Groupes = getSous_Groupes;
exports.getGroupes = getGroupes;
exports.getTags = getTags;
exports.getRecherche = getRecherche;
exports.getHistorique = getHistorique;
exports.getMenu = getMenu;
exports.getDesigne_Tags = getDesigne_Tags;
exports.getUsers = getUsers;
exports.getLastElementPlats = getLastElementPlats;
exports.getElementsPlatsAfter = getElementsPlatsAfter;
exports.updateIngredients = updateIngredients;
exports.updatePlats = updatePlats;
exports.updateSous_Groupes = updateSous_Groupes;
exports.updateGroupes = updateGroupes;
exports.updateRecherches = updateRecherches;
exports.updateMenus = updateMenus;
exports.updateRestaurants = updateRestaurants;
exports.updatePlats_Ingredients = updatePlats_Ingredients;
exports.updateMenus_Plats = updateMenus_Plats;
exports.updatePlats_Client = updatePlats_Client;
exports.addIngredients = addIngredients;
exports.addPlats = addPlats;
exports.addPlats_Client = addPlats_Client;
exports.addPlats_Ingredients = addPlats_Ingredients;
exports.addPlats_Ingredients_Client = addPlats_Ingredients_Client;
exports.addMenus_Client = addMenus_Client;
exports.addRestaurant_Client = addRestaurant_Client;
exports.addRecherches_Client = addRecherches_Client;
exports.addSous_Groupes = addSous_Groupes;
exports.addGroupes = addGroupes;
exports.addTags = addTags;
exports.addRecherche = addRecherche;
exports.addHistorique = addHistorique;
exports.addMenu = addMenu;
exports.addDesigne_Tags = addDesigne_Tags;
exports.addUsers = addUsers;
exports.deleteIngredients = deleteIngredients;
exports.deletePlats = deletePlats;
exports.deleteSous_Groupes = deleteSous_Groupes;
exports.deleteGroupes = deleteGroupes;
exports.deleteTags = deleteTags;
exports.deleteRecherche = deleteRecherche;
exports.deleteHistorique = deleteHistorique;
exports.deleteMenu = deleteMenu;
exports.deleteDesigne_Tags = deleteDesigne_Tags;
var fs_1 = require("fs");
var path_1 = require("path");
var url_1 = require("url");
var sqlite3_1 = require("sqlite3");
var db = null;
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var dbPath = path_1.default.join(__dirname, '../bdd_doc/ingredient_carbon_score.db');
function openDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (fs_1.default.existsSync(dbPath)) {
                console.log('Le fichier existe.');
            }
            else {
                console.log('Le fichier n\'existe pas.');
                return [2 /*return*/, null];
            }
            if (!db) {
                db = new sqlite3_1.default.Database(dbPath, function (err) {
                    if (err) {
                        console.error('Erreur lors de l\'ouverture de la base de données:', err.message);
                    }
                    else {
                        console.log('Base de données ouverte avec succès!');
                    }
                });
            }
            return [2 /*return*/, db];
        });
    });
}
function initDB() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!db) return [3 /*break*/, 2];
                    return [4 /*yield*/, openDatabase()];
                case 1:
                    db = _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function addSmt(table, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initDB()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!db) {
                                return reject(new Error("La base de données n'est pas ouverte."));
                            }
                            var insertQuery = "\n    INSERT INTO ".concat(table, " (").concat(Object.keys(data).join(", "), ")\n        VALUES (").concat(Object.values(data)
                                .map(function (a) { return "'".concat(a, "'"); })
                                .join(","), ")\n    ");
                            var stmt = db.prepare(insertQuery);
                            stmt.run(function (err) {
                                if (err) {
                                    reject(new Error("Erreur lors de l'insertion: " + err.message));
                                }
                                else {
                                    resolve(this.lastID);
                                }
                            });
                        })];
            }
        });
    });
}
function getSmt(table_1, data_1) {
    return __awaiter(this, arguments, void 0, function (table, data, all, limit, str) {
        if (all === void 0) { all = false; }
        if (limit === void 0) { limit = 10; }
        if (str === void 0) { str = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initDB()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!db) {
                                return reject(new Error("La base de données n'est pas ouverte."));
                            }
                            var selectQuery = "SELECT * FROM ".concat(table);
                            if (data) {
                                var conditions = Object.entries(data)
                                    .map(function (_a) {
                                    var key = _a[0], value = _a[1];
                                    return str ? "".concat(key, " LIKE ?") : "".concat(key, " = ?");
                                })
                                    .join(" AND ");
                                selectQuery += " WHERE ".concat(conditions);
                            }
                            if (limit) {
                                selectQuery += " LIMIT ".concat(limit);
                            }
                            // console.log("la query : ",selectQuery);
                            var stmt = db.prepare(selectQuery);
                            var values = Object.values(data);
                            stmt.all.apply(stmt, __spreadArray(__spreadArray([], values, false), [function (err, rows) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(rows || []);
                                    }
                                }], false));
                        })];
            }
        });
    });
}
function updateSmt(table, query, set) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initDB()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!db) {
                                return reject(new Error("La base de données n'est pas ouverte."));
                            }
                            // Création de la requête sécurisée
                            var updateQuery = "\n      UPDATE ".concat(table, "\n      SET ").concat(Object.keys(set).map(function (key) { return "".concat(key, " = ?"); }).join(", "), "\n      WHERE ").concat(query, ";\n    ");
                            console.log("update query :", updateQuery);
                            var stmt = db.prepare(updateQuery);
                            stmt.run(__spreadArray([], Object.values(set), true), function (err) {
                                if (err) {
                                    reject(new Error("Erreur lors de la mise à jour: " + err.message));
                                }
                                else {
                                    resolve(this.changes);
                                }
                            });
                            stmt.finalize();
                        })];
            }
        });
    });
}
function deleteSmt(table, query) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initDB()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            // Vérifier si la base de données est ouverte
                            if (!db) {
                                return reject(new Error("La base de données n'est pas ouverte."));
                            }
                            var deleteQuery = "\n      DELETE FROM ".concat(table, " WHERE ").concat(query, ";\n    ");
                            var stmt = db.prepare(deleteQuery);
                            stmt.run(function (err) {
                                if (err) {
                                    reject(new Error("Erreur lors de la suppression: " + err.message));
                                }
                                else {
                                    resolve(this.changes);
                                }
                            });
                        })];
            }
        });
    });
}
/**
 * GETS / READS PAR TABLE ///////////////////////////////////////////////////////////////
 */
function getIngredients() {
    return __awaiter(this, arguments, void 0, function (data, all, str, limit) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        if (str === void 0) { str = false; }
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Ingredients", data, all, limit, str)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getPlats_Ingredients_Client() {
    return __awaiter(this, arguments, void 0, function (data, all, str, limit) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        if (str === void 0) { str = false; }
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Plats_Ingredients_Client", data, all, limit, str)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getPlats_Client() {
    return __awaiter(this, arguments, void 0, function (data, all, str, limit) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        if (str === void 0) { str = false; }
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Plats_Client", data, all, limit, str)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getMenus_Client() {
    return __awaiter(this, arguments, void 0, function (data, all, str, limit) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        if (str === void 0) { str = false; }
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Menus_Client", data, all, limit, str)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getRecherches_Client() {
    return __awaiter(this, arguments, void 0, function (data, all, str, limit) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        if (str === void 0) { str = false; }
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Recherches_Client", data, all, limit, str)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getRestaurant_Client() {
    return __awaiter(this, arguments, void 0, function (data, all, str, limit) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        if (str === void 0) { str = false; }
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Restaurants_Client", data, all, limit, str)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getPlats() {
    return __awaiter(this, arguments, void 0, function (data, all, str, limit) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        if (str === void 0) { str = false; }
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Plats", data, all, limit, str)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0 || res[0] == null) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getPlats_Ingredients() {
    return __awaiter(this, arguments, void 0, function (data, all, str, limit) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        if (str === void 0) { str = false; }
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Plats_Ingredients", data, all, limit, str)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0 || res[0] == null) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getSous_Groupes() {
    return __awaiter(this, arguments, void 0, function (data, all) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Sous_Groupes", data, all, 10)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getGroupes() {
    return __awaiter(this, arguments, void 0, function (data, all) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Groupes", data, all, 10)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getTags() {
    return __awaiter(this, arguments, void 0, function (data, all) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Tags", data, all, 10)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getRecherche() {
    return __awaiter(this, arguments, void 0, function (data, all) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Recherche", data, all, 10)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getHistorique() {
    return __awaiter(this, arguments, void 0, function (data, all) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Historique", data, all, 10)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getMenu() {
    return __awaiter(this, arguments, void 0, function (data, all) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Menu", data, all, 10)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getDesigne_Tags() {
    return __awaiter(this, arguments, void 0, function (data, all) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Designe_Tags", data, all, 10)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getUsers() {
    return __awaiter(this, arguments, void 0, function (data, all, str, limit) {
        var res;
        if (data === void 0) { data = false; }
        if (all === void 0) { all = false; }
        if (str === void 0) { str = false; }
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSmt("Users", data, all, limit, str)];
                case 1:
                    res = _a.sent();
                    if (!res || res.length == 0) {
                        return [2 /*return*/, all ? [] : undefined];
                    }
                    else {
                        return [2 /*return*/, res];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getLastElementPlats() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initDB()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!db) {
                                return reject(new Error("La base de données n'est pas ouverte."));
                            }
                            var selectQuery = "SELECT * FROM Plats ORDER BY ID_plat DESC LIMIT 1";
                            var stmt = db.prepare(selectQuery);
                            stmt.all(function (err, rows) {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(rows || []);
                                }
                            });
                        })];
            }
        });
    });
}
function getElementsPlatsAfter(data_1) {
    return __awaiter(this, arguments, void 0, function (data, after) {
        if (after === void 0) { after = true; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initDB()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!db) {
                                return reject(new Error("La base de données n'est pas ouverte."));
                            }
                            var selectQuery = "SELECT * FROM Plats";
                            if (data) {
                                var conditions = Object.entries(data)
                                    .map(function (_a) {
                                    var key = _a[0], value = _a[1];
                                    return after ? "".concat(key, " > ?") : "".concat(key, " = ?");
                                })
                                    .join(" AND ");
                                selectQuery += " WHERE ".concat(conditions);
                            }
                            // console.log("la query : ",selectQuery);
                            var stmt = db.prepare(selectQuery);
                            var values = Object.values(data);
                            stmt.all.apply(stmt, __spreadArray(__spreadArray([], values, false), [function (err, rows) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(rows || []);
                                    }
                                }], false));
                        })];
            }
        });
    });
}
/**
 * UPDATES PAR TABLE
 */
function updateIngredients(data, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSmt("Ingredients", query, data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function updatePlats(data, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSmt("Plats", query, data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function updateSous_Groupes(data, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSmt("Sous_Groupes", query, data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function updateGroupes(data, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSmt("Groupes", query, data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function updateRecherches(data, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSmt("Recherches", query, data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function updateMenus(data, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSmt("Menus", query, data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function updateRestaurants(data, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSmt("Restaurants", query, data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function updatePlats_Ingredients(data, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSmt("Plats_Ingredients", query, data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function updateMenus_Plats(data, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSmt("Menus_Plats", query, data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function updatePlats_Client(data, query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSmt("Plats_Client", query, data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
/**
 * INSERT PAR TABLE
 */
function addIngredients() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Ingredients", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addPlats() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Plats", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addPlats_Client() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Plats_Client", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addPlats_Ingredients() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Plats_Ingredients", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addPlats_Ingredients_Client() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Plats_Ingredients_Client", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addMenus_Client() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Menus_Client", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addRestaurant_Client() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Restaurants_Client", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addRecherches_Client() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Recherches_Client", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addSous_Groupes() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Sous_Groupes", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addGroupes() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Groupes", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addTags() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Tags", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addRecherche() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Recherche", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addHistorique() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Historique", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addMenu() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Menu", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addDesigne_Tags() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Designe_Tags", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function addUsers() {
    return __awaiter(this, arguments, void 0, function (data) {
        var res;
        if (data === void 0) { data = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, addSmt("Users", data)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
/**
 * DELETE PAR TABLE
 */
function deleteIngredients(data) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "idCD = '".concat(data.ID_ingredient, "'");
                    return [4 /*yield*/, deleteSmt("Ingredients", query)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function deletePlats(data) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "idCD = '".concat(data.Ciqual_AGB, "'");
                    return [4 /*yield*/, deleteSmt("Plats", query)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function deleteSous_Groupes(data) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "idCD = '".concat(data.ID_sous_groupe, "'");
                    return [4 /*yield*/, deleteSmt("Sous_Groupes", query)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function deleteGroupes(data) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "idCD = '".concat(data.ID_groupe, "'");
                    return [4 /*yield*/, deleteSmt("Groupes", query)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function deleteTags(data) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "idCD = '".concat(data.ID_tags, "'");
                    return [4 /*yield*/, deleteSmt("Tags", query)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function deleteRecherche(data) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "idCD = '".concat(data.ID_recherche, "'");
                    return [4 /*yield*/, deleteSmt("Recherche", query)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function deleteHistorique(data) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "idCD = '".concat(data.ID_historique, "'");
                    return [4 /*yield*/, deleteSmt("Historique", query)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function deleteMenu(data) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "idCD = '".concat(data.ID_menu, "'");
                    return [4 /*yield*/, deleteSmt("Menu", query)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
function deleteDesigne_Tags(data) {
    return __awaiter(this, void 0, void 0, function () {
        var query, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "idCD = '".concat(data.ID_tags, "'");
                    return [4 /*yield*/, deleteSmt("Designe_Tags", query)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}

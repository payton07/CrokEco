import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { getIngredients } from "@/utils/bdd";
import { PostPlatClient } from "@/utils/routes";
import { Ingredient, FormData, schema } from "@/utils/type";
import { Fond_vert_clair, Fourchette, Vert_feuille } from "@/utils/constants";

export default function AddDishForm() {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      ingredients: [],
    },
  });
  const [loading, setLoading] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [quantite, setQuantite] = useState("");
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
  const [ingredientsData, setIngredientsData] = useState<string[]>([]);

  async function Alter_IngredientFromBdd(text: string) {
    const query = `%${text}%`;
    const data = await getIngredients({ Nom_Francais: query }, true, true, 30);

    if (data !== undefined) {
      const Ing: string[] = [];
      for (const ele of data) {
        if (!Ing.includes(ele.Nom_Francais)) Ing.push(ele.Nom_Francais);
      }
      setIngredientsData(Ing);
    }
  }
  function Alterquantite(text: string) {
    setQuantite(text);
  }

  function inter(ingredient: string) {
    if (ingredient.trim()) {
      setIngredient(ingredient.trim());
      setFilteredIngredients([]);
    }
  }

  function addIngredient() {
    if (ingredient.trim() && quantite.trim()) {
      const newdata = [
        ...ingredientsList,
        { name: ingredient.trim(), weight: quantite.trim() },
      ];
      setIngredientsList(newdata);
      setValue("ingredients", newdata);
      setIngredient("");
      setQuantite("");
    }
  }

  function deleteIngredient(index: number) {
    const newdata = ingredientsList.filter((_, i) => i !== index);
    setIngredientsList(newdata);
    setValue("ingredients", newdata);
  }

  async function filterIngredients(text: string) {
    setIngredient(text);
    await Alter_IngredientFromBdd(text);
    if (text.trim() === "") {
      setFilteredIngredients([]);
    } else {
      const filtered = ingredientsData.filter((Element) =>
        Element.toLowerCase().startsWith(text.toLowerCase()),
      );
      setFilteredIngredients(filtered);
    }
  }

  async function onSubmit(data: FormData) {
    setLoading(true);
    // console.log("la data du form",data);

    // Insertion dans la bd de la backends
    const re = await PostPlatClient(data);
    //
    Alert.alert(
      re.message,
      `Nom: ${data.name}\nNombre : ${data.ingredients.length} ingrédients`,
    );
    reset();
    setLoading(false);
    setIngredient("");
    setQuantite("");
    setIngredientsList([]);
    setFilteredIngredients([]);
    setIngredientsData([]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Plat</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom du plat :</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nom du plat"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}

        <Text style={styles.label}>Ingrédients :</Text>
        <TextInput
          style={styles.input2}
          placeholder="Taper un ingrédient"
          value={ingredient}
          onChangeText={filterIngredients}
        />
        <View style={styles.flottante}>
        {filteredIngredients.length > 0 && (
          <View style={styles.suggestionsBox}>
            <FlatList
              data={filteredIngredients}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => inter(item)}>
                  <View style={styles.suggestionItem}>
                    <Text style={styles.suggestionText}>{item}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
        )}
        </View>
        <TextInput
          style={[styles.input, { width: "100%" }]}
          placeholder="quantite en grammes"
          value={quantite}
          onChangeText={Alterquantite}
        />
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {ingredientsList.length > 0 && (
        <FlatList
          data={ingredientsList}
          renderItem={({ item, index }) => (
            <View style={styles.ingredientItem}>
              <Text style={styles.ingredientText}>
                {item.name} {item.weight} {"g"}
              </Text>
              <TouchableOpacity
                onPress={() => deleteIngredient(index)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {errors.ingredients && (
        <Text style={styles.errorText}>{errors.ingredients.message}</Text>
      )}

      <Pressable
        style={[styles.button, { opacity: loading ? 0.5 : 1 }]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Ajout en cours..." : "Ajouter le plat"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: 'white',
    backgroundColor: `${Fond_vert_clair}`,
    // borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "100%",
    borderWidth: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Fourchette,
    marginBottom: 16,
    textAlign: "center",
    alignSelf: "center",
    left: -100,
  },
  inputContainer: {
    backgroundColor: Fond_vert_clair,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 4,
    borderColor: Fourchette,
    height: "50%",
    // justifyContent : "center"
  },
  label: {
    color: Fourchette,
    marginBottom: 20,
    marginTop: 20,
    fontSize: 18,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    bottom: "2%",
  },
  input2: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    bottom: "3%",
    // width:"60%"
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: Fourchette,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    // color: Fourchette,
    fontWeight: "bold",
    fontSize: 16,
  },

  addButton: {
    backgroundColor: Fourchette,
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  ingredientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  ingredientText: {
    fontSize: 16,
    color: "#333",
  },
  removeButton: {
    backgroundColor: Vert_feuille,
    padding: 4,
    borderRadius: 4,
  },
  removeButtonText: {
    color: Fourchette,
    fontSize: 12,
    fontWeight: "bold",
  },
  suggestionsBox: {
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 8,
    maxHeight: 200,
    zIndex: 1,
    // width: '45%',
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionText: {
    color: "#333",
  },
  flottante :{
    position : "absolute",
    zIndex : 10,
    width : "100%",
    top : 227,
    left : 12,
    backgroundColor : "transparent",
  }
});

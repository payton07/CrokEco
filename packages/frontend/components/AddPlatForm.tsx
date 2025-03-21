import { View, Text, TextInput, TouchableOpacity, Alert, Pressable, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { getIngredients } from '@/utils/bdd';


type Ingredient = {
  name: string;
  weight: string;
};

type FormData = {
  name: string;
  ingredients: Ingredient[];
};

const schema = yup.object({
  name: yup.string().required("Le nom du plat est obligatoire"),
  ingredients: yup.array().of(
    yup.object({
      name: yup.string().required("Le nom de l'ingrédient est obligatoire"),
      weight: yup.string().required("Le poids est obligatoire"),
    })
  ).min(1, "Veuillez ajouter au moins un ingrédient")
  .default([]),
});
  

export default function AddDishForm() {
  const { control, handleSubmit, reset,setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
        name: "",
        ingredients: [],
      },
  });
  const forms : FormData[] = [];
  const [loading, setLoading] = useState(false);
  const [ingredient, setIngredient] = useState(''); 
  const [quantite, setQuantite] = useState(''); 
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<any[]>([]);
  const [ingredientsData, setIngredientsData ]= useState<string[]>([]);
  

  async function Alter_IngredientFromBdd(text:string){
    const query = `%${text}%`;
    const data = await getIngredients({Nom_Francais : query},true,true,30); 
    console.log("J'ai eu la data", data?.length);
    if(data !== undefined){
      const Ing : string[]= [];
      for (const ele of data) {
        if(!Ing.includes(ele.Nom_Francais)) Ing.push(ele.Nom_Francais);
      }
      setIngredientsData(Ing);
    }
    
  }
  function Alterquantite(text:string){
    setQuantite(text);
  }

  function inter(ingredient: string){
    if (ingredient.trim()) {
      setIngredient(ingredient.trim());
      setFilteredIngredients([]); 
    }
  }

  function addIngredient(){
    if (ingredient.trim() && quantite.trim()) {
        const newdata = [...ingredientsList, {name: ingredient.trim(), weight: quantite.trim()}];
        setIngredientsList(newdata);
        setValue("ingredients", newdata);
        setIngredient('');
        setQuantite('');
      }
  };

  function deleteIngredient(index: number){
    const newdata = ingredientsList.filter((_, i) => i !== index)
    setIngredientsList(newdata);
    setValue("ingredients", newdata);
  };
  
  async function filterIngredients(text: string){
      setIngredient(text);
      await Alter_IngredientFromBdd(text);
      if (text.trim() === '') {
          setFilteredIngredients([]);
        } else {
            const filtered = ingredientsData.filter(Element =>
                Element.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredIngredients(filtered);
        }
    };
    
  function onSubmit(data: FormData){
      setLoading(true);
      console.log("la data du form",data);
      // Insertion dans la bd de la backend
      
      //
      Alert.alert("Plat ajouté !", `Nom: ${data.name}\nNombre : ${data.ingredients.length} ingrédients`);
      reset();
      setLoading(false);
      setIngredient('');
      setQuantite('');
      setIngredientsList([]);
      setFilteredIngredients([]);
      setIngredientsData([]);
    };

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
      </View>
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ingrédients :</Text>
        <TextInput
          style={styles.input2}
          placeholder="Taper un ingrédient"
          value={ingredient}
          onChangeText={filterIngredients}
        />
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
        <TextInput
          style={[styles.input, { width: "80%" }]}
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
              <Text style={styles.ingredientText}>{item.name} {item.weight} {"g"}</Text>
              <TouchableOpacity onPress={() => deleteIngredient(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {errors.ingredients && <Text style={styles.errorText}>{errors.ingredients.message}</Text>}

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
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
    alignSelf: 'center',
  },
  inputContainer: {
    backgroundColor: '#f7f7f7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    // flexDirection: 'row',
  },
  label: {
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input2: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    // width:"60%"
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  addButton: {
    backgroundColor: '#2ecc71',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 4,
    borderRadius: 4,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  suggestionsBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
    maxHeight: 200,
    // width: '45%',
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    color: '#333',
  },
});

// Import: Packages
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../utils/axios";
import JSONPretty from "react-json-pretty";

// Import: Elements
import { Container, Wrapper } from "./ApiFetch.elements";
var JSONPrettyMon = require("react-json-pretty/dist/monikai");

// Component: ApiFetch
export default function ApiFetch({ db }) {
  // State: savedApiData
  const [savedApiData, setSavedApiData] = useState({
    abilities: [],
    base_experience: 0,
    forms: [],
    game_indices: [],
    height: 0,
    held_items: [],
    id: 0,
    is_default: false,
    location_area_encounters: "",
    moves: [],
    name: "",
    order: 0,
    past_types: [],
    species: {},
    sprites: {},
    stats: [],
    types: [],
    weight: 0,
  });

  // Effect: Set savedApiData values to === values.ApiDb
  // ... if no values are in the database, set values === empty defaults
  useEffect(() => {
    // Create database store
    db.version(1).stores({ formData: "id, value" });

    // Read/write transaction on new database store
    db.transaction("rw", db.formData, async () => {
      // Get all savedApiData values from database data
      const dbAbilities = await db.formData.get("abilities");
      const dbBaseExperience = await db.formData.get("base_experience");
      const dbForms = await db.formData.get("forms");
      const dbGameIndices = await db.formData.get("game_indices");
      const dbHeight = await db.formData.get("height");
      const dbHeldItems = await db.formData.get("held_items");
      const dbId = await db.formData.get("id");
      const dbIsDefault = await db.formData.get("is_default");
      const dbLocationAreaEncounters = await db.formData.get(
        "location_area_encounters"
      );
      const dbMoves = await db.formData.get("moves");
      const dbName = await db.formData.get("name");
      const dbOrder = await db.formData.get("order");
      const dbPastTypes = await db.formData.get("past_types");
      const dbSpecies = await db.formData.get("species");
      const dbSprites = await db.formData.get("sprites");
      const dbStats = await db.formData.get("stats");
      const dbTypes = await db.formData.get("types");
      const dbWeight = await db.formData.get("weight");

      // If the savedApiData values have not been added, populate with empty defaults
      if (!dbAbilities) await db.formData.add({ id: "abilities", value: [] });
      if (!dbBaseExperience)
        await db.formData.add({ id: "base_experience", value: 0 });
      if (!dbForms) await db.formData.add({ id: "forms", value: [] });
      if (!dbGameIndices)
        await db.formData.add({ id: "game_indices", value: [] });
      if (!dbHeight) await db.formData.add({ id: "height", value: 0 });
      if (!dbHeldItems) await db.formData.add({ id: "held_items", value: [] });
      if (!dbId) await db.formData.add({ id: "id", value: 0 });
      if (!dbIsDefault)
        await db.formData.add({ id: "is_default", value: false });
      if (!dbLocationAreaEncounters)
        await db.formData.add({ id: "location_area_encounters", value: "" });
      if (!dbMoves) await db.formData.add({ id: "moves", value: [] });
      if (!dbName) await db.formData.add({ id: "name", value: "" });
      if (!dbOrder) await db.formData.add({ id: "order", value: 0 });
      if (!dbPastTypes) await db.formData.add({ id: "past_types", value: [] });
      if (!dbSpecies) await db.formData.add({ id: "species", value: {} });
      if (!dbSprites) await db.formData.add({ id: "sprites", value: {} });
      if (!dbStats) await db.formData.add({ id: "stats", value: [] });
      if (!dbTypes) await db.formData.add({ id: "types", value: [] });
      if (!dbWeight) await db.formData.add({ id: "weight", value: 0 });

      // Set the initial values
      setSavedApiData({
        abilities: dbAbilities ? dbAbilities.value : [],
        base_experience: dbBaseExperience ? dbBaseExperience.value : 0,
        forms: dbForms ? dbForms.value : [],
        game_indices: dbGameIndices ? dbGameIndices.value : [],
        height: dbHeight ? dbHeight.value : 0,
        held_items: dbHeldItems ? dbHeldItems.value : [],
        id: dbId ? dbId.value : 0,
        is_default: dbIsDefault ? dbIsDefault.value : false,
        location_area_encounters: dbLocationAreaEncounters
          ? dbLocationAreaEncounters.value
          : "",
        moves: dbMoves ? dbMoves.value : [],
        name: dbName ? dbName.value : "",
        order: dbOrder ? dbOrder.value : 0,
        past_types: dbPastTypes ? dbPastTypes.value : [],
        species: dbSpecies ? dbSpecies.value : {},
        sprites: dbSprites ? dbSprites.value : {},
        stats: dbStats ? dbStats.value : [],
        types: dbTypes ? dbTypes.value : [],
        weight: dbWeight ? dbWeight.value : 0,
      });
    }).catch((error) => {
      console.log(error.stack || error);
      throw new Error(error.stack || error);
    });

    // Close the database connection if ApiFetch is unmounted
    // ... or if the database connection changes
    return () => db.close();
  }, [db]);

  // Fetch API data
  function getApiData() {
    axios
      .all([apiUrl.get(``, {})])
      .then(
        axios.spread((apiResponse) => [
          setSavedApiData({
            abilities: apiResponse.data.abilities,
            base_experience: apiResponse.data.base_experience,
            forms: apiResponse.data.forms,
            game_indices: apiResponse.data.game_indices,
            height: apiResponse.data.height,
            held_items: apiResponse.data.held_items,
            id: apiResponse.data.id,
            is_default: apiResponse.data.is_default,
            location_area_encounters: apiResponse.data.location_area_encounters,
            moves: apiResponse.data.moves,
            name: apiResponse.data.name,
            order: apiResponse.data.order,
            past_types: apiResponse.data.past_types,
            species: apiResponse.data.species,
            sprites: apiResponse.data.sprites,
            stats: apiResponse.data.stats,
            types: apiResponse.data.types,
            weight: apiResponse.data.weight,
          }),
        ])
      )
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }

  // Sets the values in the store and in the state
  const setFormValues = (id) => (value) => {
    db.formData.put({ id, value });

    // Update state
    setSavedApiData((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
    }));
  };

  // ... assigns id/values appropriately in IndexedDB
  const handleInputValues = (id) => (value) => setFormValues(id)(value);

  // Adds id/value data to IndexedDB
  function addToDb() {
    handleInputValues("abilities")(savedApiData.abilities);
    handleInputValues("base_experience")(savedApiData.base_experience);
    handleInputValues("forms")(savedApiData.forms);
    handleInputValues("game_indices")(savedApiData.game_indices);
    handleInputValues("height")(savedApiData.height);
    handleInputValues("held_items")(savedApiData.held_items);
    handleInputValues("id")(savedApiData.id);
    handleInputValues("is_default")(savedApiData.is_default);
    handleInputValues("location_area_encounters")(
      savedApiData.location_area_encounters
    );
    handleInputValues("moves")(savedApiData.moves);
    handleInputValues("name")(savedApiData.name);
    handleInputValues("order")(savedApiData.order);
    handleInputValues("past_types")(savedApiData.past_types);
    handleInputValues("species")(savedApiData.species);
    handleInputValues("sprites")(savedApiData.sprites);
    handleInputValues("stats")(savedApiData.stats);
    handleInputValues("types")(savedApiData.types);
    handleInputValues("weight")(savedApiData.weight);
  }

  return (
    <>
      <Container>
        <h1>OD&amp;T API Sandbox</h1>
        <button type="button" onClick={getApiData}>
          Click for API fetch
        </button>
        <button type="button" onClick={addToDb}>
          Save API data to Local DB
        </button>

        <Wrapper>
          <JSONPretty
            id="json-pretty"
            data={savedApiData}
            theme={JSONPrettyMon}
          ></JSONPretty>
        </Wrapper>
      </Container>
    </>
  );
}

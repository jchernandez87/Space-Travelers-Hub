import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const missionsURL = 'https://api.spacexdata.com/v3/missions';

const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  const response = await axios.get(missionsURL);
  return response.data.map((mission) => ({
    missionId: mission.mission_id,
    name: mission.mission_name,
    description: mission.description,
    status: null,
  }));
});

export const missionsSlice = createSlice({
  name: 'missions',
  initialState: {
    missions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMissions.fulfilled, (state, action) => {
      state.missions = [...state.missions, ...action.payload];
    });
  },
});

export { fetchMissions };

export default missionsSlice.reducer;

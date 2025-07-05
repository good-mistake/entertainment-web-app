import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { MediaItem } from "@/app/utils/types";

interface MediaState {
  items: MediaItem[];
  loading: boolean;
  bookmarking: string[];
  search: string;
}

const initialState: MediaState = {
  items: [],
  loading: false,
  bookmarking: [],
  search: "",
};

export const fetchMediaItems = createAsyncThunk<MediaItem[], boolean>(
  "media/fetchMediaItems",
  async (isAuthenticated) => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/media", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch authenticated media");
      return res.json();
    } else {
      const res = await fetch("/data.json");
      if (!res.ok) throw new Error("Failed to fetch guest media");
      const data = await res.json();

      return data.map((item: MediaItem, index: number) => ({
        ...item,
        id: `${index}-${item.title.replace(/\s+/g, "-").toLowerCase()}`,
      }));
    }
  }
);
export const toggleBookmarkBackend = createAsyncThunk<
  { mediaId: string },
  string
>("media/toggleBookmarkBackend", async (mediaId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/bookmark", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mediaId }),
    });

    if (!res.ok) throw new Error("Failed to toggle bookmark");

    return { mediaId };
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});
const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    toggleBookmark(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.isBookmarked = !item.isBookmarked;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMediaItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMediaItems.rejected, (state) => {
        state.loading = false;
        state.items = [];
      })

      .addCase(toggleBookmarkBackend.fulfilled, (state, action) => {
        const item = state.items.find((i) => i.id === action.payload.mediaId);
        if (item) item.isBookmarked = !item.isBookmarked;
      });
  },
});

export const { toggleBookmark, setSearch } = mediaSlice.actions;
export default mediaSlice.reducer;

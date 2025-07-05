// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { MediaItem } from "@/app/utils/types";
// interface BookmarkState {
//   data: MediaItem[];
// }

// const initialState: BookmarkState = {
//   data: [],
// };

// const bookdmarksSlice = createSlice({
//   name: "bookmarks",
//   initialState,
//   reducers: {
//     setBookmarks: (state, action: PayloadAction<MediaItem[]>) => {
//       state.data = action.payload;
//     },
//     toggleBookmark: (state, action: PayloadAction<string>) => {
//       const item = state.data.find(
//         (item: MediaItem) => item.title === action.payload
//       );
//       if (item) item.isBookmarked = !item.isBookmarked;
//     },
//   },
// });
// export const { setBookmarks, toggleBookmark } = bookdmarksSlice.actions;
// export default bookdmarksSlice.reducer;

export const MESSAGES = {
  UNAUTHORIZED: "Unauthorized - you must be logged in",
  ADMIN_REQUIRED: "Unauthorized - you must be an admin",
  INVALID_TOKEN: "Unauthorized - Invalid token",
  NO_TOKEN: "Unauthorized - No token provided",
  FILES_REQUIRED: "Please upload all files",
  ALBUM_NOT_FOUND: "Album not found",
  SONG_NOT_FOUND: "Song not found",
  SONG_DELETED: "Song deleted successfully",
  ALBUM_DELETED: "Album deleted successfully",
  INVALID_GOOGLE_TOKEN: "Invalid Google token",
  INTERNAL_ERROR: "Internal server error",
  FORBIDDEN: "Forbidden - you do not have permission to access this resource",
  USER_NOT_FOUND: "User not found",
  ERROR : {
    SEND_MESSAGE: "Error sending message",
  },
} as const;
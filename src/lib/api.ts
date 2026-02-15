const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  let data;

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new Error(data?.message || data || "Request failed");
  }

  return data;
};

export const authAPI = {
  register: async (firstName: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, email, password }),
      });

      return await handleResponse(response);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Network error - is the server running on port 5001?");
      }
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      return await handleResponse(response);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Network error - is the server running on port 5001?");
      }
      throw error;
    }
  },

  getMe: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return await handleResponse(response);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Network error - is the server running on port 5001?");
      }
      throw error;
    }
  },
};

export const dashboardAPI = {
  getDashboard: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return await handleResponse(response);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Network error - is the server running on port 5001?");
      }
      throw error;
    }
  },

  updateDashboard: async (
    token: string,
    data: {
      dietaryConstraints?: string[];
      allergies?: string[];
      availableIngredients?: string[];
      favoriteCuisines?: string[];
    }
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      return await handleResponse(response);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Network error - is the server running on port 5001?");
      }
      throw error;
    }
  },

  addDishToHistory: async (
    token: string,
    title: string,
    ingredients: string[]
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, ingredients }),
      });

      return await handleResponse(response);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Network error - is the server running on port 5001?");
      }
      throw error;
    }
  },
};

export const recipeAPI = {
  generateRecipe: async (
    token: string,
    title: string,
    dietaryConstraints: string[] = [],
    allergies: string[] = [],
    availableIngredients: string[] = []
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipe/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          dietaryConstraints,
          allergies,
          availableIngredients,
        }),
      });

      return await handleResponse(response);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error("Network error - is the server running on port 5001?");
      }
      throw error;
    }
  },

  getRecipeById: async (id: string, token?: string) => {
    try {
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch(`${API_BASE_URL}/recipe/search/${id}`, {
        method: "GET",
        headers,
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  getRecipesByCuisine: async (region: string, filters: any = {}, token?: string) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch(`${API_BASE_URL}/recipe/cuisine/${region}?${queryParams}`, {
        method: "GET",
        headers,
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  getRecipesByIngredients: async (excludeIngredients: string, excludeCategories: string, token?: string) => {
    try {
      const queryParams = new URLSearchParams({ excludeIngredients, excludeCategories }).toString();
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch(`${API_BASE_URL}/recipe/ingredients?${queryParams}`, {
        method: "GET",
        headers,
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  getInstructions: async (id: string, token?: string) => {
    try {
      const headers: any = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await fetch(`${API_BASE_URL}/recipe/instructions/${id}`, {
        method: "GET",
        headers,
      });
      return await handleResponse(response);
    } catch (error) {
      throw error;
    }
  },
};

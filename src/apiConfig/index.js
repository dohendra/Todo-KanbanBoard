const API_BASE_URL = 'http://localhost:8000';

const handleResponse = async (response) => {
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message || 'Something went wrong');
  }
  return json;
};

// register user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    return handleResponse(response);
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch user by username and password
export const loginApi = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users?username=${username}&password=${password}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching user by username and password:', error);
    throw error;
  }
};

// Add a new user
export const addUser = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// Update a user
export const updateUser = async (id, user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message || 'Something went wrong');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

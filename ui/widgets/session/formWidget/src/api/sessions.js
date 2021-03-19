import { getDefaultOptions, request } from 'api/helpers';

const resource = 'api/sessions';

export const apiSessionGet = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'GET',
  };
  return request(url, options);
};

export const apiSessionPost = async (serviceUrl, session) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'POST',
    body: session ? JSON.stringify(session) : null,
  };
  return request(url, options);
};

export const apiSessionPut = async (serviceUrl, session) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'PUT',
    body: session ? JSON.stringify(session) : null,
  };
  return request(url, options);
};

export const apiSessionDelete = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'DELETE',
  };
  return request(url, options);
};

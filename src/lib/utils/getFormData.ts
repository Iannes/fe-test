export const getFormData = (formElement: HTMLFormElement) => {
  const data = new FormData(formElement);
  const d = Object.fromEntries(data);
  const entries = Object.keys(d);
  const results = entries.map((entry) => {
    const [result, checkId] = entry.split("-") as string[];
    let api = {
      checkId,
      result,
    };

    return api;
  });
  return results;
};

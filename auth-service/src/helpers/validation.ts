export function validateParams(requiredFields: string[], object: any) {
  const missingParams = [];

  for(const field of requiredFields) {
    if(!object[field]) {
      missingParams.push(field);
    }
  }

  return {
    hasErrors: missingParams.length > 0,
    errors: missingParams
  }
} 
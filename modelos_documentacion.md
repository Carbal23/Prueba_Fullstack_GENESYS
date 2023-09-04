# Modelo Pet
Descripción: Este modelo representa a las mascotas disponibles en la tienda CMPC-Dogs.

## Propiedades:

* id (tipo: número): Identificador único de la mascota.
* name (tipo: cadena de texto): Nombre de la mascota.
* age (tipo: número): Edad de la mascota.
* sex (tipo: enumeración "Male" o "Female"): Sexo de la mascota.
* breedId (tipo: número): ID de la raza a la que pertenece la mascota.
* subBreedId (tipo: número, opcional): ID de la subraza de la mascota (si aplica).

## Relaciones:

* breed (relación con el modelo Breed): Representa la relación entre la mascota y su raza, relacion de muchos a uno.
* subBreed (relación con el modelo SubBreed, opcional): Representa la relación entre la mascota y su subraza (si aplica), la relacion es de muchos a uno.

# Modelo Breed

Descripción: Este modelo representa las razas de las mascotas.

# Propiedades:

* id (tipo: número): Identificador único de la raza.
* name (tipo: cadena de texto): Nombre de la raza.

## Relaciones:

* subBreeds (relación con el modelo SubBreed): Representa la relación entre la raza y sus subrazas, relacion de uno a muchos.

# Modelo SubBreed
 
Descripción: Este modelo representa las subrazas de las mascotas (si aplica).

## Propiedades:

* id (tipo: número): Identificador único de la subraza.
* name (tipo: cadena de texto): Nombre de la subraza.

## Relaciones:

No tiene relaciones directas con otros modelos, tiene una relacion con la raza de muchos a uno.

# DTO PetDto

Descripción: DTO (Objeto de Transferencia de Datos) utilizado para crear una nueva mascota.

## Propiedades:

* name (tipo: cadena de texto): Nombre de la mascota (mínimo 3 caracteres).
* age (tipo: número): Edad de la mascota.
* sex (tipo: enumeración "Male" o "Female"): Sexo de la mascota.
* breedId (tipo: número): ID de la raza a la que pertenece la mascota.
* subBreedId (tipo: número, opcional): ID de la subraza de la mascota (si aplica).

## Validaciones:

* name debe tener al menos 3 caracteres.
* sex debe ser "Male" o "Female".

Ejemplo de uso:

```json
{
    "name": "Fido",
    "age": 3,
    "sex": "Male",
    "breedId": 1,
    "subBreedId": 1,
}
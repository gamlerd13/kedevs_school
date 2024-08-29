
def create_data ():
    pass

#Aqui agregar ...

#Comando para en sql(postgres) para convertir csv en datos sql

\COPY Alumno(grade, seccion, dni, fullName) FROM 'archivo.csv' DELIMITER ',' CSV HEADER;
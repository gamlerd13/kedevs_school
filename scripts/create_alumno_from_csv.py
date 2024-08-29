
def create_data ():
    pass

#Aqui agregar ...

#Comando para en sql(postgres) para convertir csv en datos sql

\COPY Alumno(grade, section, dni, fullName) FROM '/root/colegio/scripts/initial_value.csv' DELIMITER ',' CSV HEADER;


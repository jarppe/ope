
#
# --------------------------------------------------------------------------------
# EURA2021: Apply DB migrations:
# --------------------------------------------------------------------------------
#


FROM flyway/flyway:6-alpine


COPY ./conf /flyway/conf
COPY ./sql /flyway/sql


CMD ["migrate"]
